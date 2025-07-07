import { FileEntity } from '@src/files/infrastructure/persistence/relational/entities/file.entity';
import { UserEntity } from '@src/modules/users-management/infraestructure/persistence/relational/entity/user.entity';
import { AuditableEventEntity } from '@src/modules/shared-kernel/infraestructure/persistence/relational/entities/domain-event.entity';
import { DrivingTrainingRecordEntity } from '../../modules/driving-management/infraestructure/persistence/relational/entity/practice-register/driving-training-record.entity';
import { DrivingTrainingDailyLogEntity } from '../../modules/driving-management/infraestructure/persistence/relational/entity/practice-register/driving-training-daily-log.entity';
import { DrivingTeoricRecordEntity } from '../../modules/driving-management/infraestructure/persistence/relational/entity/teoric-register/driving-teoric-record.entity';
import { EnrollmentRecordEntity } from '../../modules/enrollment-management/infraestructure/persistence/relational/entity/enrollment-record.entity';
import { CoursesEntity } from '../../modules/driving-management/infraestructure/persistence/relational/entity/training/courses.entity';
import { LicenseCategoryEntity } from '../../modules/driving-management/infraestructure/persistence/relational/entity/training/license-category.entity';
import { PasswordResetTokenEntity } from '../../modules/creadentials-management/infraestructure/persistence/relational/password-reset-token.entity';
import { VehiclesEntity } from '../../modules/driving-management/infraestructure/persistence/relational/entity/training/vehicles.entity';

export const allEntities = [
  AuditableEventEntity,
  UserEntity,
  FileEntity,
  DrivingTrainingRecordEntity,
  DrivingTrainingDailyLogEntity,
  DrivingTeoricRecordEntity,
  EnrollmentRecordEntity,
  CoursesEntity,
  LicenseCategoryEntity,
  PasswordResetTokenEntity,
  VehiclesEntity,
];
