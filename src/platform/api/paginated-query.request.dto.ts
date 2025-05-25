import { ApiPropertyOptional } from '@nestjs/swagger';
import { plainToInstance, Transform, Type } from 'class-transformer';
import { IsInt, IsOptional, Max, Min, ValidateNested } from 'class-validator';
import { SortRequestDto } from './sort.request.dto';
import { FilterRequestDto } from './filter.request.dto';

export class PaginatedQueryRequestDto {
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(99999)
  @Transform(({ value }) => (value ? Number(value) : 20))
  @Type(() => Number)
  @ApiPropertyOptional({
    example: 10,
    description: 'Specifies a limit of returned records',
    required: false,
  })
  readonly limit: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(99999)
  @Transform(({ value }) => (value ? Number(value) : 1))
  @Type(() => Number)
  @ApiPropertyOptional({
    example: 1,
    description: 'Page number',
    required: false,
  })
  readonly page: number;

  @ApiPropertyOptional({
    type: String,
    example: JSON.stringify([
      {
        field: 'id',
        type: 'like',
        value: '0',
      },
    ] as FilterRequestDto[]),
    description: ` FilterRequestDto: \n
    field: string \n
    type: equal | like | in | between \n
    value: string | number | (string | number)[] | [string | number, string | number] \n
    `.trim(),
  })
  @IsOptional()
  @Transform(({ value }) =>
    value ? plainToInstance(FilterRequestDto, JSON.parse(value)) : [],
  )
  @ValidateNested({ each: true })
  @Type(() => FilterRequestDto)
  readonly filterOptions?: FilterRequestDto[];

  @ApiPropertyOptional({
    type: String,
    example: JSON.stringify([
      { field: 'id', order: 'asc' },
    ] as SortRequestDto[]),
    description: `SortRequestDto \n 
    field: keyof Entity \n
    order: asd | desc`,
  })
  @IsOptional()
  @Transform(({ value }) => {
    return value ? plainToInstance(SortRequestDto, JSON.parse(value)) : [];
  })
  @ValidateNested({ each: true })
  @Type(() => SortRequestDto)
  readonly sortOptions?: SortRequestDto[];

  @IsOptional()
  readonly userId?: string;
}
