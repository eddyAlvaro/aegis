import { EventEmitter2 } from '@nestjs/event-emitter';
import * as O from 'fp-ts/Option';
import { Repository, FindOneOptions } from 'typeorm';
import {
  AggregateRoot,
  Mapper,
  Paginated,
  PaginatedQueryParams,
  QueryParams,
  RepositoryPort,
} from '../ddd';
import { DecoratedEntity } from './decorated-entity';
import { TypeORMBase } from './typeorm.base';

export abstract class TypeORMRepositoryBase<
    Aggregate extends AggregateRoot<any>,
    DbEntity extends DecoratedEntity,
  >
  extends TypeORMBase<DbEntity>
  implements RepositoryPort<Aggregate>
{
  protected constructor(
    protected readonly repository: Repository<DbEntity>,
    protected readonly mapper: Mapper<Aggregate, DbEntity>,
    protected readonly eventEmitter: EventEmitter2,
  ) {
    super(repository);
  }

  async findOne(
    options: FindOneOptions<DbEntity>,
  ): Promise<O.Option<Aggregate>> {
    const result = await this.baseFindOne(options);
    return result
      ? O.some(await this.mapper.persistenceToDomain(result))
      : O.none;
  }

  async findAll(
    params: QueryParams = { filterOptions: [], sortOptions: [] },
    relations: string[] = [],
  ): Promise<Aggregate[]> {
    // const repository = this.manager.getRepository<DbEntity>(this.entity);
    const results = await this.baseFindAll(params, relations);
    return Promise.all(results.map(this.mapper.persistenceToDomain));
  }

  async findAllPaginated(
    params: PaginatedQueryParams,
    relations: string[] = [],
  ): Promise<Paginated<Aggregate>> {
    const results = await this.baseFindAllPaginated(params, relations);

    const entities = Promise.all(
      results.data.map(this.mapper.persistenceToDomain),
    );

    return new Paginated({
      data: await entities,
      count: results.count,
      limit: params.limit,
      page: params.page,
    });
  }

  async delete(entity: Aggregate): Promise<boolean> {
    entity.validate();
    // const result = await this.repository.delete(entity.id);

    const result = await this.baseDelete(entity.id);

    // this.logger.debug(
    //   `[${RequestContextService.getRequestId()}] deleting entity ${entity.id} from ${this.tableName}`,
    // );

    // await entity.publishEvents(this.logger, this.eventEmitter);
    await entity.publishEvents(this.eventEmitter);

    return result;
  }

  async update(entity: Aggregate | Aggregate[]): Promise<void> {
    const entities = Array.isArray(entity) ? entity : [entity];
    entities.forEach((entity) => entity.validate());

    const records = Promise.all(
      entities.map((entity) => this.mapper.domainToPersistence(entity)),
    );
    await this.baseUpdate(await records);
    await Promise.all(
      entities.map((entity) =>
        // entity.publishEvents(this.logger, this.eventEmitter),
        entity.publishEvents(this.eventEmitter),
      ),
    );
  }

  async insert(entity: Aggregate | Aggregate[]): Promise<void> {
    const entities = Array.isArray(entity) ? entity : [entity];
    entities.forEach((entity) => entity.validate());
    const records = Promise.all(
      entities.map((entity) => this.mapper.domainToPersistence(entity)),
    );

    await this.baseInsert(await records);
    await Promise.all(
      entities.map((entity) =>
        // entity.publishEvents(this.logger, this.eventEmitter),
        entity.publishEvents(this.eventEmitter),
      ),
    );
  }
}
