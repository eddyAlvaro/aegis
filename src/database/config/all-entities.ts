import { FileEntity } from '@src/files/infrastructure/persistence/relational/entities/file.entity';
import { UserEntity } from '@src/modules/users-management/infraestructure/persistence/relational/entity/user.entity';
import { AuditableEventEntity } from '@src/modules/shared-kernel/infraestructure/persistence/relational/entities/domain-event.entity';
import { DrivingTrainingRecordEntity } from '../../modules/driving/infraestructure/persistence/relational/entity/driving-training-record.entity';
import { DrivingTrainingDailyLogEntity } from '../../modules/driving/infraestructure/persistence/relational/entity/driving-training-daily-log.entity';

export const allEntities = [
  AuditableEventEntity,
  UserEntity,
  FileEntity,
  DrivingTrainingRecordEntity,
  DrivingTrainingDailyLogEntity,
];
