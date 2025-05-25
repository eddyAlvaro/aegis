import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsOptional } from 'class-validator';

export class KpiPlatformParamsDto {
  @ApiProperty({
    example: 1,
    description: 'Page number',
    required: false,
  })
  @IsOptional()
  readonly organizationIds?: string[];

  @ApiProperty()
  @IsDate()
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  readonly startDate: Date;

  @ApiProperty()
  @IsDate()
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  readonly endDate: Date;
}
