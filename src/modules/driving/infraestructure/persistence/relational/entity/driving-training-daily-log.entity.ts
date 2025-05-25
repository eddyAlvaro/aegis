import { IsOptional } from 'class-validator';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { FileType } from '../../../../../../files/domain/file';
import { DrivingTrainingRecordEntity } from './driving-training-record.entity';

@Entity()
export class DrivingTrainingDailyLogEntity {
  @PrimaryColumn('uuid')
  @IsOptional()
  id: string;

  @ManyToOne(
    () => DrivingTrainingRecordEntity,
    (driving) => driving.dailyLogs,
    {
      eager: true,
      cascade: true,
    },
  )
  @JoinColumn()
  drivingTrainingRecord: DrivingTrainingRecordEntity;
}
