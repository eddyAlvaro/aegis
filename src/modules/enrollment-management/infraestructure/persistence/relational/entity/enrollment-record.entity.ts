import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { DrivingTeoricRecordEntity } from '../../../../../driving-management/infraestructure/persistence/relational/entity/teoric-register/driving-teoric-record.entity';
import { DrivingTrainingRecordEntity } from '../../../../../driving-management/infraestructure/persistence/relational/entity/practice-register/driving-training-record.entity';
import { UserEntity } from '../../../../../users-management/infraestructure/persistence/relational/entity/user.entity';
import { LicenseCategoryEntity } from '../../../../../driving-management/infraestructure/persistence/relational/entity/training/license-category.entity';

@Entity()
export class EnrollmentRecordEntity {
  @PrimaryColumn('uuid')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.enrollmentRecords)
  enrolledUser: UserEntity;

  @OneToMany(
    () => DrivingTeoricRecordEntity,
    (driving) => driving.enrollmentRecord,
  )
  drivingTeoricRecords: DrivingTeoricRecordEntity[];

  @OneToOne(
    () => DrivingTrainingRecordEntity,
    (driving) => driving.enrollmentRecord,
  )
  drivingTrainingRecord: DrivingTrainingRecordEntity;

  @Column({ type: 'varchar', length: 50, nullable: true })
  status: 'ACTIVE' | 'INACTIVE';

  @Column({ type: 'varchar', length: 50, nullable: true })
  procedureType: 'RECATEGOROZACION' | 'REVALIDACION';

  @Column({ type: 'timestamptz', nullable: true })
  classStartDate: Date | null;

  @Column({ type: 'timestamptz', nullable: true })
  classEndDate: Date | null;

  @ManyToOne(
    () => LicenseCategoryEntity,
    (desiredLicense) => desiredLicense.enrollments,
  )
  desiredLicense: LicenseCategoryEntity;

  @Column({ type: 'varchar', length: 50, nullable: true })
  schedule: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  shift: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  occupation: string;

  @Column({ type: 'timestamptz', nullable: true })
  issueDate: Date | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  score: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  payrollNumber: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  certificateNumber: string;
}
