import { ApiProperty } from '@nestjs/swagger';
import { IsDate } from 'class-validator';

export class KpiOrganizationRequestDto {
  @ApiProperty()
  @IsDate()
  readonly startDate: Date;

  @ApiProperty()
  @IsDate()
  readonly endDate: Date;
}
