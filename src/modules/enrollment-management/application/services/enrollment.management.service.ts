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

@Injectable()
export class EnrollmentManagementService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly typeOrmUserRepository: Repository<UserEntity>,
    @InjectRepository(EnrollmentRecordEntity)
    private readonly typeOrmEnrollmentRecordRepository: Repository<EnrollmentRecordEntity>,
    @InjectRepository(LicenseCategoryEntity)
    private readonly typeOrmLicenseCategoryRepository: Repository<LicenseCategoryEntity>,
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

    const viewEnrollmentRecord = await this.typeOrmEnrollmentRecordRepository
      .createQueryBuilder('enrollment')
      .leftJoinAndSelect('enrollment.enrolledUser', 'user')
      .leftJoinAndSelect('enrollment.desiredLicence', 'license')
      .getMany();

    console.log('viewEnrollmentRecord', viewEnrollmentRecord);

    const licence = await this.typeOrmLicenseCategoryRepository.findOne({
      where: {
        id: body.desiredLicence.id,
      },
    });

    console.log('isValidUser', existingUser, licence);

    if (existingUser && licence) {
      const newEnrolledUser = await this.typeOrmEnrollmentRecordRepository.save(
        {
          id: randomUUID(),
          enrolledUser: existingUser,
          desiredLicense: licence,
          ...enrollmentRecords,
        },
      );
      console.log('newEnrolledUser', newEnrolledUser);
      return newEnrolledUser;
    }

    const userId = randomUUID();
    const createdUser = await this.typeOrmUserRepository.save({
      id: userId,
      status: UserStatus.Active,
      type: UserType.Participant,
      ...rest,
    });

    return await this.typeOrmEnrollmentRecordRepository.save({
      id: randomUUID(),
      enrolledUser: createdUser,
      desiredLicense: licence,
      ...enrollmentRecords,
    });
  }

  async viewUserTeoricRecords(query: string): Promise<any> {
    // validar que la matricula este activa
  }

  async viewUserTrainingRecords(query: string): Promise<any> {
    // validar que la matricula este activa
  }
}
