import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { EnrollmentRecordEntity } from '../../../../../../../enrollment-management/infraestructure/persistence/relational/entity/enrollment-record.entity';

@Entity()
export class TeoricEvalutationEntity {
  @PrimaryColumn('uuid')
  id: string;

  @OneToOne(
    () => EnrollmentRecordEntity,
    (enrollment) => enrollment.teoricEvaluation,
    {
      eager: true,
      cascade: true,
    },
  )
  enrollmentRecord: EnrollmentRecordEntity;

  @Column({ type: 'float', nullable: true })
  examScore: number;

  @Column({ type: 'float', nullable: true })
  generalCourseScore: number;

  @Column({ type: 'float', nullable: true })
  specificCourseScore: number;

  @Column({ type: 'float', nullable: true })
  finalScore: number;
}
