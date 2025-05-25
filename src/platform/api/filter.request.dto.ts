import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import { FilterType } from '../ddd';

export class FilterRequestDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  field: string;

  @ApiProperty()
  @Type(() => String)
  @IsString()
  type: FilterType;

  @ApiProperty()
  @IsOptional()
  value:
    | string
    | number
    | (string | number)[]
    | [string | number, string | number];
}
