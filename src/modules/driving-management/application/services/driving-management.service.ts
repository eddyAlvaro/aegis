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
    // @InjectRepository(DrivingTrainingDailyLogEntity)
    // private readonly drivingTrainingDailyLogRepository: Repository<DrivingTrainingDailyLogEntity>,
  ) {}
  // async getComments(): Promise<CommentsDto[]> {
  //   return await this.commentsRepository.find();
  // }

  async createDrivingTrainingRecord(
    participant: UserEntity,
  ): Promise<CommentsDto> {
    return await this.drivingTrainingRecordRepository.save({
      id: randomUUID(),
      participant: participant,
    });
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

    console.log('newLicenseCategory', newLicenseCategory);
    return newLicenseCategory;
  }

  async findLicenseCategory(): Promise<any> {
    const courses = await this.licenseCategoryRepository
      .createQueryBuilder('license')
      .leftJoinAndSelect('license.courses', 'courses')
      .getMany();
    console.log('courses', courses);
    return courses;
  }

  async createCourse(course: CourseDto): Promise<any> {
    return await this.coursesRepository.save({ id: randomUUID(), ...course });
  }

  async findCourses(): Promise<any> {
    const courses = await this.coursesRepository.find();
    console.log('courses', courses);
    return courses;
  }
}
