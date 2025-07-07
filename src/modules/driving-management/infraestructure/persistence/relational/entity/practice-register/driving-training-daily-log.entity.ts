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
import { FileType } from '../../../../../../../files/domain/file';
import { DrivingTrainingRecordEntity } from './driving-training-record.entity';
import { CoursesEntity } from '../training/courses.entity';

@Entity()
export class DrivingTrainingDailyLogEntity {
  @PrimaryColumn('uuid')
  @IsOptional()
  id: string;

  @Column({ type: 'timestamp', nullable: true })
  initDate: Date | null;

  @Column({ type: 'timestamp', nullable: true })
  endDate: Date | null;

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

  //courses => name course
  @Column({ type: 'varchar', length: 50, nullable: true })
  drivingCircuit: string;

  @ManyToOne(() => CoursesEntity, (course) => course.dailyLogs)
  course: CoursesEntity;

  @Column({ type: 'varchar', length: 50, nullable: true })
  @Column({ type: 'varchar', length: 50, nullable: true })
  mileageStart: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  mileageEnd: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  instructor: string;
}
