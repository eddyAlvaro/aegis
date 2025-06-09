import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { QueryRequestDto } from '../../../../platform/api/query.request.dto';
import { PaginatedQueryRequestDto } from '../../../../platform/api/paginated-query.request.dto';
import { record } from 'zod';
import { count } from 'console';
import { Paginated } from '../../../../platform/ddd';
import { UserEntity } from '../../../users-management/infraestructure/persistence/relational/entity/user.entity';
import { EnrollmentUserDto } from '../dtos/enrollment-user-dto';
import { randomUUID } from 'crypto';
import { UserStatus } from '../../../users-management/domain/types/user-status';
import { UserType } from '../../../users-management/domain/types/user-type';
import { UserAlreadyExistsByDocument } from '../../../users-management/domain/failures/register.failures';
import { EnrollmentRecordEntity } from '../../infraestructure/persistence/relational/entity/enrollment-record.entity';
import { id } from 'fp-ts/lib/Refinement';
import { LicenseCategoryEntity } from '../../../driving-management/infraestructure/persistence/relational/entity/training/license-category.entity';
import {
  LicenceNotFound,
  UserHasEnrollmentActive,
} from '../../domain/failures/enrollment.failure';
import { DrivingTeoricRecordEntity } from '../../../driving-management/infraestructure/persistence/relational/entity/teoric-register/driving-teoric-record.entity';
import { DrivingTrainingRecordEntity } from '../../../driving-management/infraestructure/persistence/relational/entity/practice-register/driving-training-record.entity';

@Injectable()
export class EnrollmentManagementService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly typeOrmUserRepository: Repository<UserEntity>,
    @InjectRepository(EnrollmentRecordEntity)
    private readonly typeOrmEnrollmentRecordRepository: Repository<EnrollmentRecordEntity>,
    @InjectRepository(LicenseCategoryEntity)
    private readonly typeOrmLicenseCategoryRepository: Repository<LicenseCategoryEntity>,
    @InjectRepository(DrivingTeoricRecordEntity)
    private readonly typeOrmDrivingTeoricRecordRepository: Repository<DrivingTeoricRecordEntity>,
    @InjectRepository(DrivingTrainingRecordEntity)
    private readonly typeOrmDrivingTrainingRecordRepository: Repository<DrivingTrainingRecordEntity>,
  ) {}

  private buildCommonQueryBuilder() {
    const queryBuilder = this.typeOrmUserRepository.createQueryBuilder('user');

    console.log(queryBuilder);
    return queryBuilder;
  }

  private buildQueryBuilder(query: QueryRequestDto | PaginatedQueryRequestDto) {
    const queryBuilder = this.buildCommonQueryBuilder();

    // this.processCustomFilters(queryBuilder, query.filterOptions || []);
    // applyFilters(
    //   queryBuilder,
    //   query.filterOptions || [],
    //   'payment',
    //   this.logger,
    // );
    // applySorts(
    //   queryBuilder,
    //   buildDefaultSort(query.sortOptions, [
    //     {
    //       order: 'desc',
    //       field: 'event.createdAt',
    //     },

    //     {
    //       order: 'desc',
    //       field: 'offer.createdAt',
    //     },
    //   ]),
    //   'payment',
    // );

    return queryBuilder;
  }

  async createEnrollmentStudent(body: EnrollmentUserDto): Promise<any> {
    const { enrollmentRecords, ...rest } = body;
    const existingUser = await this.typeOrmUserRepository.findOne({
      where: {
        documentIdentifier: body.documentIdentifier,
      },
      relations: ['enrollmentRecords'],
    });

    const licence = await this.typeOrmLicenseCategoryRepository
      .createQueryBuilder('license')
      .leftJoinAndSelect('license.enrollments', 'enrollment')
      .where('license.id = :id', { id: body.desiredLicense })
      .getOne();

    if (!licence) {
      throw new LicenceNotFound();
    }

    if (existingUser) {
      const enrolledActive = await this.typeOrmEnrollmentRecordRepository
        .createQueryBuilder('enrollment')
        .leftJoinAndSelect('enrollment.enrolledUser', 'user')
        .where('user.id = :id', { id: existingUser.id })
        .andWhere('enrollment.status = :status', { status: 'ACTIVE' })
        .getOne();

      if (enrolledActive) {
        throw new UserHasEnrollmentActive();
      }

      const newEnrolledUser = await this.typeOrmEnrollmentRecordRepository.save(
        {
          id: randomUUID(),
          enrolledUser: existingUser,
          desiredLicense: licence,
          ...enrollmentRecords,
        },
      );

      await this.typeOrmDrivingTrainingRecordRepository.save({
        id: randomUUID(),
        enrollmentRecord: newEnrolledUser,
      });

      return newEnrolledUser;
    }

    const userId = randomUUID();
    const createdUser = await this.typeOrmUserRepository.save({
      id: userId,
      status: UserStatus.Active,
      type: UserType.Participant,
      ...rest,
    });

    const newEnrolledUser = await this.typeOrmEnrollmentRecordRepository.save({
      id: randomUUID(),
      enrolledUser: createdUser,
      desiredLicense: licence,
      ...enrollmentRecords,
    });
    await this.typeOrmDrivingTeoricRecordRepository.save({
      id: randomUUID(),
      enrollmentRecord: newEnrolledUser,
    });

    await this.typeOrmDrivingTrainingRecordRepository.save({
      id: randomUUID(),
      enrollmentRecord: newEnrolledUser,
    });
    return newEnrolledUser;
  }

  async viewUserTeoricRecords(query: string): Promise<any> {
    // validar que la matricula este activa
  }

  async viewUserTrainingRecords(query: string): Promise<any> {
    // validar que la matricula este activa
  }
}
