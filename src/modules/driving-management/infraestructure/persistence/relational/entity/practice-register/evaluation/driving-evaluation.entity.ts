import { IsOptional } from 'class-validator';
import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { EnrollmentRecordEntity } from '../../../../../../../enrollment-management/infraestructure/persistence/relational/entity/enrollment-record.entity';

@Entity()
export class DrivingEvalutationEntity {
  @PrimaryColumn('uuid')
  id: string;

  @OneToOne(
    () => EnrollmentRecordEntity,
    (enrollment) => enrollment.drivingEvaluation,
    {
      eager: true,
      cascade: true,
    },
  )
  enrollmentRecord: EnrollmentRecordEntity;

  @Column({ type: 'float', nullable: true })
  drivingSkillScore: number;

  @Column({ type: 'float', nullable: true })
  parkingSkillScore: number;

  @Column({ type: 'float', nullable: true })
  trafficRulesApplicationScore: number;

  @Column({ type: 'float', nullable: true })
  finalScore: number;
}
