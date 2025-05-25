import { SortRequestDto } from '../api/sort.request.dto';

export const buildDefaultSort = (
  entry?: SortRequestDto[],
  sort: SortRequestDto[] = [{ field: 'createdAt', order: 'desc' }],
): SortRequestDto[] => (entry && entry.length > 0 ? entry : sort);
