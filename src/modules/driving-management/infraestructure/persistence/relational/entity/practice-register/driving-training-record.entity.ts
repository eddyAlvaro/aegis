import { IsOptional } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { DrivingTrainingDailyLogEntity } from './driving-training-daily-log.entity';
import { EnrollmentRecordEntity } from '../../../../../../enrollment-management/infraestructure/persistence/relational/entity/enrollment-record.entity';
import { VehiclesEntity } from '../training/vehicles.entity';

@Entity()
export class DrivingTrainingRecordEntity {
  @PrimaryColumn('uuid')
  @IsOptional()
  id: string;

  @OneToOne(
    () => EnrollmentRecordEntity,
    (enrollment) => enrollment.drivingTrainingRecord,
    {
      eager: true,
      cascade: true,
    },
  )
  enrollmentRecord: EnrollmentRecordEntity;

  @OneToMany(
    () => DrivingTrainingDailyLogEntity,
    (dailyLog) => dailyLog.drivingTrainingRecord,
  )
  dailyLogs: DrivingTrainingDailyLogEntity[];

  @ManyToOne(() => VehiclesEntity, (vehicle) => vehicle.drivingTrainingRecords)
  vehicle: VehiclesEntity;
}
