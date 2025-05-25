import { IsOptional } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { UserEntity } from '../../../../../users-management/infraestructure/persistence/relational/entity/user.entity';
import { DrivingTrainingDailyLogEntity } from './driving-training-daily-log.entity';

@Entity()
export class DrivingTrainingRecordEntity {
  @PrimaryColumn('uuid')
  @IsOptional()
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.drivingTrainingRecords, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  participant: UserEntity;

  @OneToMany(
    () => DrivingTrainingRecordEntity,
    (dailyLog) => dailyLog.participant,
  )
  dailyLogs: DrivingTrainingDailyLogEntity[];
}
