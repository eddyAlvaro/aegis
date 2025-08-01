import { IsDefined } from 'class-validator';

export class CreateTeoricEvaluationDto {
  @IsDefined()
  userId: string;

  @IsDefined()
  examScore: number;

  @IsDefined()
  generalCourseScore: number;

  @IsDefined()
  specificCourseScore: number;
}
