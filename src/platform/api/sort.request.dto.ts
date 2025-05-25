import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString } from 'class-validator';

export class SortRequestDto {
  @ApiProperty()
  @Type(() => String)
  @IsString()
  field: string;

  @ApiProperty()
  @IsString()
  order: 'asc' | 'desc';
}
