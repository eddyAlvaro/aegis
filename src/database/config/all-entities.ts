import { FileEntity } from '@src/files/infrastructure/persistence/relational/entities/file.entity';
import { UserEntity } from '@src/modules/users-management/infraestructure/persistence/relational/entity/user.entity';
import { AuditableEventEntity } from '@src/modules/shared-kernel/infraestructure/persistence/relational/entities/domain-event.entity';
import { DrivingTrainingRecordEntity } from '../../modules/driving-management/infraestructure/persistence/relational/entity/practice-register/driving-training-record.entity';
import { DrivingTrainingDailyLogEntity } from '../../modules/driving-management/infraestructure/persistence/relational/entity/practice-register/driving-training-daily-log.entity';
import { DrivingTeoricRecordEntity } from '../../modules/driving-management/infraestructure/persistence/relational/entity/teoric-register/driving-teoric-record.entity';
import { EnrollmentRecordEntity } from '../../modules/users-management/infraestructure/persistence/relational/entity/enrollment-record.entity';

export const allEntities = [
  AuditableEventEntity,
  UserEntity,
  FileEntity,
  DrivingTrainingRecordEntity,
  DrivingTrainingDailyLogEntity,
  DrivingTeoricRecordEntity,
  EnrollmentRecordEntity,
];
