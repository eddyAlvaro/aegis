import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';
import { DrivingTeoricRecordEntity } from '../teoric-register/driving-teoric-record.entity';

@Entity()
export class CoursesEntity {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ name: 'category' })
  name: string;

  @Column()
  type: 'TEORIC' | 'PRACTICE';

  @Column()
  hours: number;

  @ManyToMany(() => DrivingTeoricRecordEntity, (teoric) => teoric.courses)
  drivingTeoric: DrivingTeoricRecordEntity[];
}
