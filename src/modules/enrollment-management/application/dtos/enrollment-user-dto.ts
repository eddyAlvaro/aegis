import { PickType } from '@nestjs/swagger';
import { UserEntity } from '../../../users-management/infraestructure/persistence/relational/entity/user.entity';
import { IsDefined } from 'class-validator';
import { EnrollmentRecordEntity } from '../../infraestructure/persistence/relational/entity/enrollment-record.entity';
import { LicenseCategoryEntity } from '../../../driving-management/infraestructure/persistence/relational/entity/training/license-category.entity';

export class EnrollmentUserDto {
  @IsDefined()
  email: string;

  @IsDefined()
  firstName: string;

  @IsDefined()
  lastName: string;

  @IsDefined()
  documentIdentifier: string;

  @IsDefined()
  phoneNumber: string;

  @IsDefined()
  birthDate: Date;

  @IsDefined()
  currentLicense: 'A-I' | 'A-IIb';

  @IsDefined()
  desiredLicense: string;

  @IsDefined()
  enrollmentRecords: Omit<
    EnrollmentRecordEntity,
    | 'id'
    | 'enrolledUser'
    | 'desiredLicense'
    | 'drivingTeoricRecords'
    | 'drivingTrainingRecords'
  >;
}
