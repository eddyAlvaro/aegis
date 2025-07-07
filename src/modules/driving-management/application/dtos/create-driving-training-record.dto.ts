import { IsDefined } from 'class-validator';

export class CreateDrivingTrainingRecordDto {
  @IsDefined()
  userId: string;

  @IsDefined()
  vehicleId: string;
}
