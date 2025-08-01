import { InjectRepository } from '@nestjs/typeorm';
import { CreateDrivingEvaluationDto } from '../dtos/create-driving-evaluation.dto';
import { DrivingEvalutationEntity } from '../../infraestructure/persistence/relational/entity/practice-register/evaluation/driving-evaluation.entity';
import { Repository } from 'typeorm';
import { EnrollmentRecordEntity } from '../../../enrollment-management/infraestructure/persistence/relational/entity/enrollment-record.entity';
import { UserHasNoEnrollmentActive } from '../../../enrollment-management/domain/failures/enrollment.failure';
import { randomUUID } from 'crypto';
import { Injectable } from '@nestjs/common';
import {
  EvaluationAlreadyExists,
  EvaluationNotFound,
} from '../../domain/failures/evaluation.failure';
import { TeoricEvalutationEntity } from '../../infraestructure/persistence/relational/entity/practice-register/evaluation/teoric-evaluation.entity';
import { CreateTeoricEvaluationDto } from '../dtos/create-teoric-evaluation.dto';

@Injectable()
export class EvaluationManagementService {
  constructor(
    @InjectRepository(EnrollmentRecordEntity)
    private readonly enrollmentRecordRepository: Repository<EnrollmentRecordEntity>,
    @InjectRepository(DrivingEvalutationEntity)
    private readonly drivingEvaluationRepository: Repository<DrivingEvalutationEntity>,
    @InjectRepository(TeoricEvalutationEntity)
    private readonly teoricEvaluationRepository: Repository<TeoricEvalutationEntity>,
  ) {}

  async createDrivingEvaluation(
    bodyParams: CreateDrivingEvaluationDto,
  ): Promise<any> {
    const { userId, ...rest } = bodyParams;
    const enrolledActive = await this.enrollmentRecordRepository
      .createQueryBuilder('enrollment')
      .leftJoinAndSelect('enrollment.enrolledUser', 'user')
      .leftJoinAndSelect('enrollment.desiredLicense', 'license')
      .leftJoinAndSelect(
        'enrollment.drivingTrainingRecord',
        'drivingTrainingRecord',
      )
      .where('user.id = :id', { id: userId })
      .andWhere('enrollment.status = :status', { status: 'ACTIVE' })
      .getOne();

    if (!enrolledActive) throw new UserHasNoEnrollmentActive();

    const hasEvaluation = await this.drivingEvaluationRepository
      .createQueryBuilder('drivingEvaluation')
      .leftJoinAndSelect('drivingEvaluation.enrollmentRecord', 'enrollment')
      .where('enrollment.id = :id', { id: enrolledActive.id })
      .getOne();

    if (hasEvaluation) throw new EvaluationAlreadyExists();

    const drivingSkillScore = rest.drivingSkillScore * 0.4;
    const parkingSkillScore = rest.parkingSkillScore * 0.2;
    const trafficRulesApplicationScore =
      rest.trafficRulesApplicationScore * 0.4;
    const finalScore =
      drivingSkillScore + parkingSkillScore + trafficRulesApplicationScore;

    const evaluation = this.drivingEvaluationRepository.create({
      id: randomUUID(),
      enrollmentRecord: enrolledActive,
      ...rest,
      finalScore,
    });
    return await this.drivingEvaluationRepository.save(evaluation);
  }

  async findDrivingEvaluationByParticipant(enrollmentId: string): Promise<any> {
    const enrolledActive = await this.enrollmentRecordRepository
      .createQueryBuilder('enrollment')
      .leftJoinAndSelect('enrollment.enrolledUser', 'user')
      .leftJoinAndSelect('enrollment.drivingEvaluation', 'drivingEvaluation')
      .leftJoinAndSelect('enrollment.desiredLicense', 'license')
      .leftJoinAndSelect(
        'enrollment.drivingTrainingRecord',
        'drivingTrainingRecord',
      )
      .leftJoinAndSelect('drivingTrainingRecord.dailyLogs', 'dailyLogs')
      .where('enrollment.id = :id', { id: enrollmentId })
      .getOne();

    if (!enrolledActive?.drivingEvaluation) throw new EvaluationNotFound();

    return enrolledActive;
  }

  async createTeoricEvaluation(
    bodyParams: CreateTeoricEvaluationDto,
  ): Promise<any> {
    const { userId, ...rest } = bodyParams;
    const enrolledActive = await this.enrollmentRecordRepository
      .createQueryBuilder('enrollment')
      .leftJoinAndSelect('enrollment.enrolledUser', 'user')
      .leftJoinAndSelect('enrollment.desiredLicense', 'license')
      .leftJoinAndSelect(
        'enrollment.drivingTrainingRecord',
        'drivingTrainingRecord',
      )
      .where('user.id = :id', { id: userId })
      .andWhere('enrollment.status = :status', { status: 'ACTIVE' })
      .getOne();

    if (!enrolledActive) throw new UserHasNoEnrollmentActive();

    const hasEvaluation = await this.teoricEvaluationRepository
      .createQueryBuilder('teoricEvaluation')
      .leftJoinAndSelect('teoricEvaluation.enrollmentRecord', 'enrollment')
      .where('enrollment.id = :id', { id: enrolledActive.id })
      .getOne();

    if (hasEvaluation) throw new EvaluationAlreadyExists();

    const examScore = rest.examScore;
    const generalCourseScore = rest.generalCourseScore;
    const specificCourseScore = rest.specificCourseScore;
    const finalScore =
      (examScore + generalCourseScore + specificCourseScore) / 3;

    const evaluation = this.teoricEvaluationRepository.create({
      id: randomUUID(),
      enrollmentRecord: enrolledActive,
      ...rest,
      finalScore,
    });
    return await this.teoricEvaluationRepository.save(evaluation);
  }

  async findTeoricEvaluationByParticipant(enrollmentId: string): Promise<any> {
    const enrolledActive = await this.enrollmentRecordRepository
      .createQueryBuilder('enrollment')
      .leftJoinAndSelect('enrollment.enrolledUser', 'user')
      .leftJoinAndSelect('enrollment.teoricEvaluation', 'teoricEvaluation')
      .leftJoinAndSelect('enrollment.desiredLicense', 'license')
      .leftJoinAndSelect(
        'enrollment.drivingTeoricRecords',
        'drivingTeoricRecords',
      )
      .where('enrollment.id = :id', { id: enrollmentId })
      .getOne();

    if (!enrolledActive?.teoricEvaluation) throw new EvaluationNotFound();

    return enrolledActive;
  }
}
