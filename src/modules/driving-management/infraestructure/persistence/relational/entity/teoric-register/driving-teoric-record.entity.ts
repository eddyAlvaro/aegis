import { IsOptional } from 'class-validator';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { CoursesEntity } from '../training/courses.entity';
import { EnrollmentRecordEntity } from '../../../../../../enrollment-management/infraestructure/persistence/relational/entity/enrollment-record.entity';

@Entity()
export class DrivingTeoricRecordEntity {
  @PrimaryColumn('uuid')
  @IsOptional()
  id: string;

  @ManyToOne(
    () => EnrollmentRecordEntity,
    (enrollment) => enrollment.drivingTeoricRecords,
  )
  enrollmentRecord: EnrollmentRecordEntity;

  @Column({ type: 'date', nullable: true })
  initDate: Date | null;

  @Column({ type: 'date', nullable: true })
  endDate: Date | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  class: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  instructor: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  comments: string;

  @Column({ type: 'integer', nullable: true })
  hours: number;

  @ManyToMany(() => CoursesEntity, (course) => course.drivingTeoric)
  @JoinTable()
  courses: CoursesEntity[];

  // @ManyToOne(() => UserEntity, (user) => user.drivingTrainingRecords, {
  //   eager: true,
  //   cascade: true,
  // })
  // @JoinColumn()
  // participant: UserEntity;

  // @OneToMany(
  //   () => DrivingTrainingRecordEntity,
  //   (dailyLog) => dailyLog.participant,
  // )
  // dailyLogs: DrivingTrainingDailyLogEntity[];
}
