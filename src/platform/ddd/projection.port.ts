import { FindOneOptions, FindOptionsWhere } from 'typeorm';
import * as O from 'fp-ts/Option';
import {
  Paginated,
  PaginatedQueryParams,
  QueryParams,
} from './repository.port';

export interface ProjectionPort<DbEntity> {
  insert(entity: DbEntity | DbEntity[]): Promise<void>;
  findOne(options: FindOneOptions<DbEntity>): Promise<O.Option<DbEntity>>;
  findAll(params: QueryParams, relations: string[]): Promise<DbEntity[]>;
  findAllPaginated(
    params: PaginatedQueryParams,
    relations: string[],
  ): Promise<Paginated<DbEntity>>;
  delete(query: FindOptionsWhere<DbEntity>): Promise<boolean>;
}
