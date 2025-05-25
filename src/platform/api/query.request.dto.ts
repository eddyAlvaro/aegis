import { ApiPropertyOptional } from '@nestjs/swagger';
import { plainToInstance, Transform, Type } from 'class-transformer';
import { IsOptional, ValidateNested } from 'class-validator';
import { SortRequestDto } from './sort.request.dto';
import { FilterRequestDto } from './filter.request.dto';

export class QueryRequestDto {
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
  @ValidateNested()
  @Type(() => FilterRequestDto)
  readonly filterOptions: FilterRequestDto[];

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
  readonly sortOptions: SortRequestDto[];
}
