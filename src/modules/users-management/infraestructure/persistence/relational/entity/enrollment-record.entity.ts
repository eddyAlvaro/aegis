import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { DrivingTeoricRecordEntity } from '../../../../../driving-management/infraestructure/persistence/relational/entity/teoric-register/driving-teoric-record.entity';
import { DrivingTrainingRecordEntity } from '../../../../../driving-management/infraestructure/persistence/relational/entity/practice-register/driving-training-record.entity';

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

  @OneToMany(
    () => DrivingTeoricRecordEntity,
    (driving) => driving.enrollmentRecord,
  )
  drivingTrainingRecords: DrivingTrainingRecordEntity[];

  @Column({ type: 'varchar', length: 50, nullable: true })
  status: 'ACTIVE' | 'INACTIVE';

  @Column({ type: 'varchar', length: 50, nullable: true })
  payrollNumber: string;
}
