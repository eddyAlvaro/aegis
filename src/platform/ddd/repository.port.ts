/*  Most of repositories will probably need generic 
    save/find/delete operations, so it's easier
    to have some shared interfaces.
    More specific queries should be defined
    in a respective repository.
*/

export class Paginated<T> {
  readonly count: number;
  readonly limit: number;
  readonly page: number;
  readonly data: readonly T[];

  constructor(props: Paginated<T>) {
    this.count = props.count;
    this.limit = props.limit;
    this.page = props.page;
    this.data = props.data;
  }
}

export type SortOptions = { field: string; order: 'asc' | 'desc' };

export type FilterType = 'equal' | 'like' | 'in' | 'between' | 'not' | 'not-in';
export interface FilterOptions {
  field: string;
  type: FilterType;
  value:
    | string
    | number
    | (string | number)[]
    | [string | number, string | number]; // param puede ser una cadena, número, lista de cadenas/números o un rango para "between"
}

export type PaginatedQueryParams = {
  limit: number;
  page: number;
  sortOptions: SortOptions[];
  filterOptions: FilterOptions[];
};

export type QueryParams = {
  sortOptions: SortOptions[];
  filterOptions: FilterOptions[];
};

export interface RepositoryPort<Aggregate> {
  insert(entity: Aggregate | Aggregate[]): Promise<void>;
  // findOneById(id: string): Promise<O.Option<Aggregate>>;
  findAll(params: QueryParams, relations: string[]): Promise<Aggregate[]>;
  findAllPaginated(
    params: PaginatedQueryParams,
    relations: string[],
  ): Promise<Paginated<Aggregate>>;
  delete(entity: Aggregate): Promise<boolean>;
  update(entity: Aggregate | Aggregate[]): Promise<void>;
}
