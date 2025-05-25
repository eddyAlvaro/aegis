import { Type } from '@nestjs/common';
import { ApiResponseProperty } from '@nestjs/swagger';

export class InfinityPaginationResponseDto<T> {
  data: T[];
  hasNextPage: boolean;
}

/**
 * @deprecated Use {@link InfinityDetailedPaginationResponseDto}
 * @TODO Move all pagination to new class
 */
export function InfinityPaginationResponse<T>(classReference: Type<T>) {
  abstract class Pagination {
    @ApiResponseProperty({ type: [classReference] })
    data!: T[];

    @ApiResponseProperty({
      type: Boolean,
      example: true,
    })
    hasNextPage: boolean;
  }

  Object.defineProperty(Pagination, 'name', {
    writable: false,
    value: `InfinityPagination${classReference.name}ResponseDto`,
  });

  return Pagination;
}
