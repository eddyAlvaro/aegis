import {
  SortOptions,
  PaginatedQueryParams,
  FilterOptions,
} from './repository.port';

/**
 * Base class for regular queries
 */
export abstract class QueryBase {}

/**
 * Base class for paginated queries
 */
export abstract class PaginatedQueryBase extends QueryBase {
  limit: number;
  sortOptions: SortOptions[];
  filterOptions: FilterOptions[];
  page: number;

  constructor(props: PaginatedParams<PaginatedQueryBase>) {
    super();
    this.limit = props.limit || 20;
    this.page = props.page || 1;
    this.sortOptions = props.sortOptions || [];
    this.filterOptions = props.filterOptions || [];
  }
}

export abstract class SearchQueryBase extends QueryBase {
  sortOptions: SortOptions[];
  filterOptions: FilterOptions[];

  constructor(props: SearchQueryBase) {
    super();
    this.sortOptions = props.sortOptions || [];
    this.filterOptions = props.filterOptions || [];
  }
}
// Paginated query parameters
// export type PaginatedParams<T> = Omit<
//   T,
//   'limit'  | 'sortOptions' | 'filterOptions' | 'page'
// > &
//   Partial<Omit<PaginatedQueryParams, 'offset'>>;

export type PaginatedParams<T> = Omit<
  T,
  'limit' | 'sortOptions' | 'filterOptions' | 'page'
> &
  Partial<PaginatedQueryParams>;
