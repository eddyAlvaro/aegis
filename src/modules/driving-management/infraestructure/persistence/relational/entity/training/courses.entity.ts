import { Column, Entity, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm';
import { DrivingTeoricRecordEntity } from '../teoric-register/driving-teoric-record.entity';
import { LicenseCategoryEntity } from './license-category.entity';

@Entity()
export class CoursesEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  type: 'TEORIC' | 'PRACTICE';

  @Column()
  hours: number;

  @Column()
  position: number;

  @ManyToMany(() => LicenseCategoryEntity, (license) => license.courses)
  license: LicenseCategoryEntity[];

  @ManyToMany(() => DrivingTeoricRecordEntity, (teoric) => teoric.courses)
  drivingTeoric: DrivingTeoricRecordEntity[];
}
