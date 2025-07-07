import { IsDefined } from 'class-validator';

export class CreateVehicleDto {
  @IsDefined()
  plateNumber: string;

  @IsDefined()
  category: 'M1' | 'M2';

  @IsDefined()
  mileage: string;

  @IsDefined()
  licenceCategoryId: string;

  @IsDefined()
  status: 'ACTIVE' | 'INACTIVE' | 'MAINTENANCE';
}
