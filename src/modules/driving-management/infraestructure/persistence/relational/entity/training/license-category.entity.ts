import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { EnrollmentRecordEntity } from '../../../../../../enrollment-management/infraestructure/persistence/relational/entity/enrollment-record.entity';
import { CoursesEntity } from './courses.entity';

@Entity()
export class LicenseCategoryEntity {
  @PrimaryColumn('text')
  id: string;

  @Column()
  name: string; // Ej: "M1"\

  @ManyToMany(() => CoursesEntity, (course) => course.license)
  @JoinTable()
  courses: CoursesEntity[];

  @OneToMany(() => EnrollmentRecordEntity, (driving) => driving.desiredLicence)
  enrollment: EnrollmentRecordEntity;
}
