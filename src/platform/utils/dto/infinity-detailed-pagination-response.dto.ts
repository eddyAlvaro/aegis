import { Type } from '@nestjs/common';
import { ApiResponseProperty } from '@nestjs/swagger';

export class InfinityDetailedPaginationResponseDto<T> {
  data: T[];
  total: number;
  hasNextPage: boolean;
}

export function InfinityDetailedPaginationResponse<T>(classReference: Type<T>) {
  abstract class Pagination {
    @ApiResponseProperty({ type: [classReference] })
    data!: T[];

    @ApiResponseProperty({ type: Number })
    total!: number;

    @ApiResponseProperty({
      type: Boolean,
      example: true,
    })
    hasNextPage: boolean;
  }

  Object.defineProperty(Pagination, 'name', {
    writable: false,
    value: `InfinityDetailedPagination${classReference.name}ResponseDto`,
  });

  return Pagination;
}
