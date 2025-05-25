import * as O from 'fp-ts/Option';
import { Repository, FindOneOptions } from 'typeorm';
import { Paginated, PaginatedQueryParams, QueryParams } from '../ddd';
import { DecoratedEntity } from './decorated-entity';
import { DeleteCriteria, TypeORMBase } from './typeorm.base';
import { ProjectionPort } from '../ddd/projection.port';

export abstract class TypeORMProjectionBase<DbEntity extends DecoratedEntity>
  extends TypeORMBase<DbEntity>
  implements ProjectionPort<DbEntity>
{
  protected constructor(protected readonly repository: Repository<DbEntity>) {
    super(repository);
  }

  async delete(criteria: DeleteCriteria<DbEntity>): Promise<boolean> {
    const result = await this.baseDelete(criteria);
    return result;
  }

  async findOne(
    options: FindOneOptions<DbEntity>,
  ): Promise<O.Option<DbEntity>> {
    const result = await this.baseFindOne(options);
    return result ? O.some(result) : O.none;
  }

  async findAll(
    params: QueryParams = { filterOptions: [], sortOptions: [] },
    relations: string[] = [],
  ): Promise<DbEntity[]> {
    const results = await this.baseFindAll(params, relations);
    return results;
  }

  async findAllPaginated(
    params: PaginatedQueryParams,
    relations: string[] = [],
  ): Promise<Paginated<DbEntity>> {
    const results = await this.baseFindAllPaginated(params, relations);

    return new Paginated({
      data: results.data,
      count: results.count,
      limit: params.limit,
      page: params.page,
    });
  }

  async insert(entity: DbEntity | DbEntity[]): Promise<void> {
    const entities = Array.isArray(entity) ? entity : [entity];
    await this.baseInsert(entities);
  }
}
