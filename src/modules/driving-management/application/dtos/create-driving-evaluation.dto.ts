import { IsDefined } from 'class-validator';

export class CreateDrivingEvaluationDto {
  @IsDefined()
  userId: string;

  @IsDefined()
  drivingSkillScore: number;

  @IsDefined()
  parkingSkillScore: number;

  @IsDefined()
  trafficRulesApplicationScore: number;
}
