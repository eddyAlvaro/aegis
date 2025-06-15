import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CommentsDto } from '../dtos/driving-training-record.dto';
import { randomUUID } from 'crypto';
import { MailService } from '../../../../mail/mail.service';
import { UserEntity } from '../../../users-management/infraestructure/persistence/relational/entity/user.entity';
import { DrivingTrainingRecordEntity } from '../../infraestructure/persistence/relational/entity/practice-register/driving-training-record.entity';
import { CoursesEntity } from '../../infraestructure/persistence/relational/entity/training/courses.entity';
import { CourseDto } from '../dtos/course-dto';
import { LicenseCategoryEntity } from '../../infraestructure/persistence/relational/entity/training/license-category.entity';
import { LicenceCategoryDto } from '../dtos/licence-category-dto';
import { EnrollmentRecordEntity } from '../../../enrollment-management/infraestructure/persistence/relational/entity/enrollment-record.entity';
import {
  LicenceNotFound,
  NoCoursesAvailable,
  UserHasNoEnrollmentActive,
} from '../../../enrollment-management/domain/failures/enrollment.failure';
import { DrivingTeoricRecordEntity } from '../../infraestructure/persistence/relational/entity/teoric-register/driving-teoric-record.entity';
import { CreateDrivingTeoricRecordDto } from '../dtos/create-driving-teoric-record.dto';
import { UpdateCoursesForLicenseCategoryDto } from '../dtos/update-licence-category.dto';

@Injectable()
export class DrivingManagementService {
  private readonly logger = new Logger(DrivingManagementService.name);
  constructor(
    @InjectRepository(DrivingTrainingRecordEntity)
    private readonly drivingTrainingRecordRepository: Repository<DrivingTrainingRecordEntity>,
    @InjectRepository(CoursesEntity)
    private readonly coursesRepository: Repository<CoursesEntity>,
    @InjectRepository(LicenseCategoryEntity)
    private readonly licenseCategoryRepository: Repository<LicenseCategoryEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(EnrollmentRecordEntity)
    private readonly enrollmentRecordRepository: Repository<EnrollmentRecordEntity>,
    @InjectRepository(DrivingTeoricRecordEntity)
    private readonly drivingTeoricRecordRepository: Repository<DrivingTeoricRecordEntity>,
    // @InjectRepository(DrivingTrainingDailyLogEntity)
    // private readonly drivingTrainingDailyLogRepository: Repository<DrivingTrainingDailyLogEntity>,
  ) {}
  // async getComments(): Promise<CommentsDto[]> {
  //   return await this.commentsRepository.find();
  // }

  async createDrivingTrainingRecord(participant: string): Promise<void> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id: participant })
      .getOne();
    console.log('user', user);
  }
  async createDrivingTeoricRecord(
    bodyParams: CreateDrivingTeoricRecordDto,
  ): Promise<void> {
    const { id, ...rest } = bodyParams;
    const enrolledActive = await this.enrollmentRecordRepository
      .createQueryBuilder('enrollment')
      .leftJoinAndSelect('enrollment.enrolledUser', 'user')
      .leftJoinAndSelect('enrollment.desiredLicense', 'license')
      .leftJoinAndSelect('license.courses', 'courses')
      .where('user.id = :id', { id: id })
      .andWhere('enrollment.status = :status', { status: 'ACTIVE' })
      .getOne();

    if (!enrolledActive) throw new UserHasNoEnrollmentActive();

    const allCourses = enrolledActive.desiredLicense.courses
      .filter((c) => c.type === 'TEORIC')
      .sort((a, b) => a.position - b.position);

    const existingRecords = await this.drivingTeoricRecordRepository
      .createQueryBuilder('drivingTeoricRecord')
      .leftJoinAndSelect('drivingTeoricRecord.courses', 'courses')
      .where('drivingTeoricRecord.enrollmentRecord = :enrollment', {
        enrollment: enrolledActive.id,
      })
      .getMany();

    const usedCourseIds = new Set<string>();
    existingRecords.forEach((record) => {
      record.courses.forEach((course) => usedCourseIds.add(course.id));
    });

    const remainingCourses = allCourses.filter(
      (course) => !usedCourseIds.has(course.id),
    );

    console.log('remainingCourses', remainingCourses);
    const selectedCourses: CoursesEntity[] = [];

    let totalHours = 0;

    for (const course of remainingCourses) {
      console.log('course', course);
      console.log('totalHours', totalHours);
      console.log('course.hours', course.hours);
      console.log('bodyParams.hours', bodyParams.hours);
      if (totalHours + course.hours <= bodyParams.hours) {
        selectedCourses.push(course);
        totalHours += course.hours;
      } else {
        break;
      }
    }

    if (selectedCourses.length === 0) throw new NoCoursesAvailable();

    console.log('enrolledActive', enrolledActive.desiredLicense.courses);
    const newDrivingTeoricRecord = this.drivingTeoricRecordRepository.create({
      id: randomUUID(),
      enrollmentRecord: enrolledActive,
      courses: selectedCourses,
      ...rest,
    });
    await this.drivingTeoricRecordRepository.save(newDrivingTeoricRecord);
  }

  async findDrivingTeoricRecordByParticipant(
    participantId: string,
  ): Promise<DrivingTeoricRecordEntity[]> {
    const enrolledActive = await this.enrollmentRecordRepository
      .createQueryBuilder('enrollment')
      .leftJoinAndSelect('enrollment.enrolledUser', 'user')
      .leftJoinAndSelect(
        'enrollment.drivingTeoricRecords',
        'drivingTeoricRecords',
      )
      .leftJoinAndSelect('drivingTeoricRecords.courses', 'courses')
      .where('user.id = :id', { id: participantId })
      .andWhere('enrollment.status = :status', { status: 'ACTIVE' })
      .getOne();

    if (!enrolledActive) throw new UserHasNoEnrollmentActive();

    return enrolledActive.drivingTeoricRecords;
  }

  async createLicenseCategory(
    category: Omit<LicenceCategoryDto, 'id'>,
  ): Promise<any> {
    const courses = await this.coursesRepository.findBy({
      id: In(category.courses),
    });

    const newLicenseCategory = this.licenseCategoryRepository.create({
      id: randomUUID(),
      name: category.name,
      courses: courses,
    });
    await this.licenseCategoryRepository.save(newLicenseCategory);

    return newLicenseCategory;
  }

  async updateCoursesForLicenseCategory(
    category: UpdateCoursesForLicenseCategoryDto,
  ): Promise<any> {
    const licence = await this.licenseCategoryRepository
      .createQueryBuilder('license')
      .leftJoinAndSelect('license.courses', 'courses')
      .where('license.id = :id', { id: category.id })
      .getOne();

    if (!licence) throw new LicenceNotFound();

    const courses = await this.coursesRepository.findBy({
      id: In(category.courses),
    });

    const newLicenceCourses = [...licence.courses, ...courses];
    const updateLicence = await this.licenseCategoryRepository.create({
      id: category.id,
      name: licence.name,
      courses: newLicenceCourses,
    });
    await this.licenseCategoryRepository.save(updateLicence);
    return updateLicence;
  }

  async findLicenseCategory(): Promise<any> {
    const courses = await this.licenseCategoryRepository
      .createQueryBuilder('license')
      .leftJoinAndSelect('license.courses', 'courses')
      .getMany();
    console.log('courses', courses);
    return courses;
  }

  async createCourse(course: Omit<CourseDto, 'id'>): Promise<any> {
    return await this.coursesRepository.save({ id: randomUUID(), ...course });
  }

  async findCourses(): Promise<any> {
    const courses = await this.coursesRepository.find();
    console.log('courses', courses);
    return courses;
  }
}
