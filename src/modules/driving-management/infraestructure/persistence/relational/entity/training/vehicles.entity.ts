import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { DrivingTrainingRecordEntity } from '../practice-register/driving-training-record.entity';
import { LicenseCategoryEntity } from './license-category.entity';

@Entity()
export class VehiclesEntity {
  @PrimaryColumn('text')
  id: string;

  @Column({ name: 'plate_number', unique: true })
  plateNumber: string; // Ej: "BVV-196"

  @Column({ name: 'category' })
  category: string; // Ej: "M1"

  @Column({ name: 'mileage' })
  mileage: string; // Ej: 26833

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => DrivingTrainingRecordEntity, (record) => record.vehicle)
  drivingTrainingRecords: DrivingTrainingRecordEntity[];

  @ManyToOne(
    () => LicenseCategoryEntity,
    (licenceCategory) => licenceCategory.vehicles,
  )
  licenceCategory: LicenseCategoryEntity;

  @Column({ type: 'varchar', length: 50, nullable: true })
  status: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE';
}
