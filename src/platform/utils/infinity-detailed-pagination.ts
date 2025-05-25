import { IPaginationOptions } from './types/pagination-options';
import { InfinityDetailedPaginationResponseDto } from './dto/infinity-detailed-pagination-response.dto';
import { IPaginated } from './types/paginated';

export const infinityDetailedPagination = <T>(
  data: IPaginated<T>,
  options: IPaginationOptions,
): InfinityDetailedPaginationResponseDto<T> => {
  return {
    data: data.data,
    total: data.total,
    hasNextPage: data.data.length === options.limit,
  };
};
