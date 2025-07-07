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
  TrainingRecordAlreadyExists,
  UserHasNoEnrollmentActive,
} from '../../../enrollment-management/domain/failures/enrollment.failure';
import { DrivingTeoricRecordEntity } from '../../infraestructure/persistence/relational/entity/teoric-register/driving-teoric-record.entity';
import { CreateDrivingTeoricRecordDto } from '../dtos/create-driving-teoric-record.dto';
import { UpdateCoursesForLicenseCategoryDto } from '../dtos/update-licence-category.dto';
import { CreateDrivingTrainingDailyRecordDto } from '../dtos/create-driving-training-daily-record.dto';
import { VehiclesEntity } from '../../infraestructure/persistence/relational/entity/training/vehicles.entity';
import { CreateVehicleDto } from '../dtos/create-vehicle.dto';
import { CreateDrivingTrainingRecordDto } from '../dtos/create-driving-training-record.dto';
import { VehicleNotFound } from '../../domain/failures/driving.failure';
import { DrivingTrainingDailyLogEntity } from '../../infraestructure/persistence/relational/entity/practice-register/driving-training-daily-log.entity';

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
    @InjectRepository(VehiclesEntity)
    private readonly vehiclesRepository: Repository<VehiclesEntity>,
    @InjectRepository(DrivingTrainingDailyLogEntity)
    private readonly drivingTrainingDailyLogRepository: Repository<DrivingTrainingDailyLogEntity>,
    // @InjectRepository(DrivingTrainingDailyLogEntity)
    // private readonly drivingTrainingDailyLogRepository: Repository<DrivingTrainingDailyLogEntity>,
  ) {}
  // async getComments(): Promise<CommentsDto[]> {
  //   return await this.commentsRepository.find();
  // }

  async createDrivingTrainingRecord(
    bodyParams: CreateDrivingTrainingRecordDto,
  ): Promise<void> {
    const { userId, vehicleId } = bodyParams;
    const enrolledActive = await this.enrollmentRecordRepository
      .createQueryBuilder('enrollment')
      .leftJoinAndSelect('enrollment.enrolledUser', 'user')
      .leftJoinAndSelect('enrollment.desiredLicense', 'license')
      .leftJoinAndSelect(
        'enrollment.drivingTrainingRecord',
        'drivingTrainingRecord',
      )
      .where('user.id = :id', { id: userId })
      .andWhere('enrollment.status = :status', { status: 'ACTIVE' })
      .getOne();
    if (!enrolledActive) throw new UserHasNoEnrollmentActive();

    if (enrolledActive.drivingTrainingRecord)
      throw new TrainingRecordAlreadyExists();

    const vehicle = await this.vehiclesRepository
      .createQueryBuilder('vehicle')
      .where('vehicle.id = :id', { id: vehicleId })
      .getOne();

    if (!vehicle) throw new VehicleNotFound();
    vehicle.status = 'INACTIVE';
    await this.vehiclesRepository.save(vehicle);
    const queryTrainingRecord = this.drivingTrainingRecordRepository.create({
      id: randomUUID(),
      enrollmentRecord: enrolledActive,
      vehicle,
    });

    const trainingRecord =
      await this.drivingTrainingRecordRepository.save(queryTrainingRecord);

    await this.enrollmentRecordRepository.save({
      id: enrolledActive.id,
      drivingTrainingRecord: trainingRecord,
    });
  }

  async createDrivingTrainingDailyLog(
    bodyParams: CreateDrivingTrainingDailyRecordDto,
  ): Promise<any> {
    const { userId, ...rest } = bodyParams;
    const trainingRecord = await this.drivingTrainingRecordRepository
      .createQueryBuilder('drivingTrainingRecord')
      .leftJoinAndSelect('drivingTrainingRecord.enrollmentRecord', 'enrollment')
      .leftJoinAndSelect('drivingTrainingRecord.vehicle', 'vehicle')
      .leftJoinAndSelect('enrollment.desiredLicense', 'license')
      .leftJoinAndSelect('license.courses', 'courses')
      .leftJoinAndSelect('enrollment.enrolledUser', 'user')
      .leftJoinAndSelect('drivingTrainingRecord.dailyLogs', 'dailyLogs')
      .where('user.id = :id', { id: userId })
      .andWhere('enrollment.status = :status', { status: 'ACTIVE' })
      .getOne();

    console.log('bodyParams', bodyParams);
    if (!trainingRecord) throw new UserHasNoEnrollmentActive();

    const allCourses = trainingRecord.enrollmentRecord.desiredLicense.courses
      .filter((c) => c.type === 'PRACTICE')
      .sort((a, b) => a.position - b.position);

    console.log('allCourses', allCourses);

    const dailyLogsCount = trainingRecord.dailyLogs?.length ?? 0;

    const nextCourse = allCourses[dailyLogsCount];

    if (!nextCourse) throw new NoCoursesAvailable();

    const mileageStart = trainingRecord.vehicle.mileage;

    const randomMileage = Math.floor(Math.random() * (70 - 60) + 60);

    const mileageEnd = Number(trainingRecord.vehicle.mileage) + randomMileage;
    const dailyLog = this.drivingTrainingDailyLogRepository.create({
      id: randomUUID(),
      initDate: bodyParams.initDate,
      endDate: bodyParams.endDate,
      drivingTrainingRecord: trainingRecord,
      course: nextCourse,
      instructor: bodyParams.instructor,
      mileageStart: mileageStart,
      mileageEnd: mileageEnd.toString(),
    });

    const mileageVehicle = await this.vehiclesRepository.findOne({
      where: { id: trainingRecord.vehicle.id },
    });

    if (!mileageVehicle) throw new VehicleNotFound();

    mileageVehicle.mileage = mileageEnd.toString();

    await this.vehiclesRepository.save(mileageVehicle);
    await this.drivingTrainingDailyLogRepository.save(dailyLog);

    return trainingRecord;
  }

  async findDrivingTrainingRecordByParticipant(
    participantId: string,
  ): Promise<any> {
    const enrollmentRecord = await this.enrollmentRecordRepository
      .createQueryBuilder('enrollment')
      .leftJoinAndSelect('enrollment.enrolledUser', 'user')
      .leftJoinAndSelect(
        'enrollment.drivingTrainingRecord',
        'drivingTrainingRecord',
      )
      .leftJoinAndSelect('enrollment.desiredLicense', 'license')
      .leftJoinAndSelect('drivingTrainingRecord.vehicle', 'vehicle')
      .leftJoinAndSelect('drivingTrainingRecord.dailyLogs', 'dailyLogs')
      .where('user.id = :id', { id: participantId })
      .andWhere('enrollment.status = :status', { status: 'ACTIVE' })
      .getOne();

    if (!enrollmentRecord) throw new UserHasNoEnrollmentActive();

    return enrollmentRecord;
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

  async createVehicle(vehicle: CreateVehicleDto): Promise<any> {
    const licenceCategory = await this.licenseCategoryRepository.findOne({
      where: {
        id: vehicle.licenceCategoryId,
      },
    });

    if (!licenceCategory) throw new LicenceNotFound();

    const { licenceCategoryId, ...rest } = vehicle;
    return await this.vehiclesRepository.save({
      id: randomUUID(),
      licenceCategory,
      ...rest,
    });
  }

  async findVehicles(): Promise<any> {
    const vehicles = await this.licenseCategoryRepository
      .createQueryBuilder('license')
      .leftJoinAndSelect('license.vehicles', 'vehicle')
      .getMany();
    console.log('vehicles', vehicles);
    return vehicles;
  }
}
