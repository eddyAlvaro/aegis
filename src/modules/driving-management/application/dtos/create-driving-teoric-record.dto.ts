import { IsDefined } from 'class-validator';
import { DrivingTeoricRecordEntity } from '../../infraestructure/persistence/relational/entity/teoric-register/driving-teoric-record.entity';

export class CreateDrivingTeoricRecordDto {
  @IsDefined()
  id: string;

  @IsDefined()
  initDate: Date;

  @IsDefined()
  endDate: Date;

  @IsDefined()
  class: string;

  @IsDefined()
  instructor: string;

  @IsDefined()
  comments: string;

  @IsDefined()
  hours: number;
}
