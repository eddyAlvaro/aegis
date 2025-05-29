import { IsOptional } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { DrivingTrainingDailyLogEntity } from './driving-training-daily-log.entity';
import { EnrollmentRecordEntity } from '../../../../../../users-management/infraestructure/persistence/relational/entity/enrollment-record.entity';

@Entity()
export class DrivingTrainingRecordEntity {
  @PrimaryColumn('uuid')
  @IsOptional()
  id: string;

  @ManyToOne(
    () => EnrollmentRecordEntity,
    (enrollment) => enrollment.drivingTrainingRecords,
    {
      eager: true,
      cascade: true,
    },
  )
  @JoinColumn()
  enrollmentRecord: EnrollmentRecordEntity;

  @OneToMany(
    () => DrivingTrainingRecordEntity,
    (dailyLog) => dailyLog.dailyLogs,
  )
  dailyLogs: DrivingTrainingDailyLogEntity[];
}
