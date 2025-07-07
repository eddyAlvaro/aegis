import { IsDefined } from 'class-validator';

export class CreateDrivingTrainingDailyRecordDto {
  @IsDefined()
  userId: string;

  @IsDefined()
  initDate: Date;

  @IsDefined()
  endDate: Date;

  @IsDefined()
  instructor: string;

  @IsDefined()
  drivingCircuit: string;
}
