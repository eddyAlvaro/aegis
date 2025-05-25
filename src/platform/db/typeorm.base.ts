import {
  Between,
  FindOneOptions,
  FindOptionsWhere,
  ILike,
  In,
  Not,
  ObjectId,
  Repository,
} from 'typeorm';
import { DecoratedEntity } from './decorated-entity';
import { Paginated, PaginatedQueryParams, QueryParams } from '../ddd';
import { ConflictException } from '../exceptions';

export type DeleteCriteria<DbEntity> =
  | string
  | string[]
  | number
  | number[]
  | Date
  | Date[]
  | ObjectId
  | ObjectId[]
  | FindOptionsWhere<DbEntity>;

export abstract class TypeORMBase<DbEntity extends DecoratedEntity> {
  protected constructor(protected readonly repository: Repository<DbEntity>) {}

  async baseDelete(criteria: DeleteCriteria<DbEntity>): Promise<boolean> {
    const result = await this.repository.delete(criteria);

    // this.logger.debug(
    //   `[${RequestContextService.getRequestId()}] deleting entity ${entity.id} from ${this.tableName}`,
    // );

    return typeof result.affected === 'number' && result.affected > 0;
  }

  public async baseUpdate(entities: DbEntity[]): Promise<void> {
    try {
      // Todo change for update method
      await this.repository.save(entities);
    } catch (error) {
      throw error;
    }
  }

  public async baseInsert(entities: DbEntity[]): Promise<void> {
    try {
      const ids = entities.filter((e) => e.id).map((e) => e.id);

      const optionsWhere: FindOptionsWhere<any> | FindOptionsWhere<any>[] = {
        id: In(ids),
      };
      const existingRecords = await this.repository.find({
        where: optionsWhere,
      });

      const existingIds = new Set(existingRecords.map((record) => record.id));

      for (const entity of entities) {
        if (entity.id && existingIds.has(entity.id)) {
          throw new ConflictException('Record already exists base insert');
        }
      }

      await this.repository.save(entities);
    } catch (error) {
      if (error.code === '23505') {
        // Unique constraint violation
        throw new ConflictException('Record already exists 23505', error);
      }
      throw error;
    }
  }

  async baseFindOne(
    options: FindOneOptions<DbEntity>,
  ): Promise<DbEntity | null> {
    return await this.repository.findOne(options);
  }

  async baseFindAll(
    params: QueryParams = { filterOptions: [], sortOptions: [] },
    relations: string[] = [],
  ): Promise<DbEntity[]> {
    const where: FindOptionsWhere<DbEntity>[] = [{}];

    params.filterOptions
      .filter((e) => e.value !== '')
      .forEach((filterOption) => {
        switch (filterOption.type) {
          case 'like':
            const valueFilter = filterOption.value as string;
            if (
              false
              // filterOption.field === 'firstName' ||
              // filterOption.field === 'lastName'
            ) {
              where.push({
                [filterOption.field]: ILike(`%${valueFilter}%`),
              } as any);
            } else {
              where[0][filterOption.field] = ILike(`%${valueFilter}%`);
            }
            break;
          case 'in':
            where[0][filterOption.field] = In(
              filterOption.value as (string | number)[],
            );
            break;
          case 'not-in':
            where[0][filterOption.field] = Not(
              In(filterOption.value as (string | number)[]),
            );
            break;
          case 'between':
            where[0][filterOption.field] = Between(
              (filterOption.value as [number, number])[0],
              (filterOption.value as [number, number])[1],
            );
            break;
          case 'not':
            where[0][filterOption.field] = Not(filterOption.value);
            break;
          default:
            where[0][filterOption.field] = filterOption.value;
            break;
        }
      });
    return await this.repository.find({
      where: where,
      order: params.sortOptions.reduce(
        (accumulator, sort) => ({
          ...accumulator,
          [sort.field]: sort.order,
        }),
        {},
      ),
      relations: relations,
    });
  }
  // async baseFindAllPaginated(
  //   params: PaginatedQueryParams,
  //   relations: string[] = [],
  // ): Promise<Paginated<DbEntity>> {
  //   const queryBuilder = this.repository.createQueryBuilder('entity');
  //
  //   params.filterOptions
  //     .filter((e) => e.value !== '')
  //     .forEach((filterOption) => {
  //       switch (filterOption.type) {
  //         case 'like':
  //           if (filterOption.field === 'fullName') {
  //             const names = (filterOption.value as string)
  //               .trim()
  //               .toLowerCase()
  //               .split(/\s+/);
  //
  //             names.forEach((name, index) => {
  //               if (index === 0) {
  //                 queryBuilder
  //                   .where('LOWER(entity.firstName) LIKE :name', {
  //                     name: `%${name}%`,
  //                   })
  //                   .orWhere('LOWER(entity.lastName) LIKE :name', {
  //                     name: `%${name}%`,
  //                   });
  //               } else {
  //                 queryBuilder
  //                   .orWhere('LOWER(entity.firstName) LIKE :name', {
  //                     name: `%${name}%`,
  //                   })
  //                   .orWhere('LOWER(entity.lastName) LIKE :name', {
  //                     name: `%${name}%`,
  //                   });
  //               }
  //             });
  //           } else {
  //             queryBuilder.andWhere(
  //               `LOWER(entity.${filterOption.field}) LIKE :value`,
  //               {
  //                 value: `%${(filterOption.value as string).toLowerCase()}%`,
  //               },
  //             );
  //           }
  //           break;
  //         case 'in':
  //           queryBuilder.andWhere(
  //             `entity.${filterOption.field} IN (:...values)`,
  //             {
  //               values: filterOption.value,
  //             },
  //           );
  //           break;
  //         case 'between':
  //           queryBuilder.andWhere(
  //             `entity.${filterOption.field} BETWEEN :start AND :end`,
  //             {
  //               start: (filterOption.value as [number, number])[0],
  //               end: (filterOption.value as [number, number])[1],
  //             },
  //           );
  //           break;
  //         case 'not':
  //           queryBuilder.andWhere(`entity.${filterOption.field} != :value`, {
  //             value: filterOption.value,
  //           });
  //           break;
  //         default:
  //           queryBuilder.andWhere(`entity.${filterOption.field} = :value`, {
  //             value: filterOption.value,
  //           });
  //           break;
  //       }
  //     });
  //
  //   relations.forEach((relation) => {
  //     // Divide la relación en partes usando '.'
  //     const parts = relation.split('.');
  //     // La primera parte es la entidad principal, el resto son sub-relaciones
  //     const baseRelation = parts.shift();
  //     if (baseRelation) {
  //       let joinPath = `entity.${baseRelation}`;
  //       let alias = baseRelation;
  //
  //       // Realiza left join para cada parte de la relación
  //       parts.forEach((part) => {
  //         alias = `${alias}_${part}`;
  //         joinPath = `${joinPath}.${part}`;
  //         queryBuilder.leftJoinAndSelect(joinPath, alias);
  //       });
  //     }
  //   });
  //
  //   const [results, count] = await queryBuilder
  //     .skip((params.page - 1) * params.limit)
  //     .take(params.limit)
  //     .orderBy(
  //       params.sortOptions.reduce(
  //         (accumulator, sort) => ({
  //           ...accumulator,
  //           [`entity.${sort.field}`]: sort.order,
  //         }),
  //         {},
  //       ),
  //     )
  //     .getManyAndCount();
  //
  //   return new Paginated({
  //     data: results,
  //     count,
  //     limit: params.limit,
  //     page: params.page,
  //   });
  // }

  async baseFindAllPaginatedOr(
    params: PaginatedQueryParams,
    relations: string[] = [],
  ): Promise<Paginated<DbEntity>> {
    const where: FindOptionsWhere<DbEntity>[] = [];
    // const where2: FindOptionsWhereProperty<DbEntity>[] = [];

    params.filterOptions
      .filter((e) => e.value !== '')
      .forEach((filterOption) => {
        switch (filterOption.type) {
          case 'like':
            const valueFilter = filterOption.value as string;
            where.push({
              [filterOption.field]: ILike(`%${valueFilter}%`),
            } as any);
            // where[filterOption.field] = ILike(`%${valueFilter}%`);
            break;
          case 'in':
            where.push({
              [filterOption.field]: In(
                filterOption.value as (string | number)[],
              ),
            } as any);
            // where[filterOption.field] = In(
            //   filterOption.value as (string | number)[],
            // );
            break;
          case 'not-in':
            where[0][filterOption.field] = Not(
              In(filterOption.value as (string | number)[]),
            );
            break;
          case 'between':
            // where[filterOption.field] = Between(
            //   (filterOption.value as [number, number])[0],
            //   (filterOption.value as [number, number])[1],
            // );
            where.push({
              [filterOption.field]: Between(
                (filterOption.value as [number, number])[0],
                (filterOption.value as [number, number])[1],
              ),
            } as any);
            break;
          case 'not':
            where.push({
              [filterOption.field]: Not(filterOption.value),
            } as any);
            //where[filterOption.field] = Not(filterOption.value);
            break;
          default:
            //where[filterOption.field] = filterOption.value;
            where.push({
              [filterOption.field]: filterOption.value,
            } as any);
            break;
        }
      });

    const [results, count] = await this.repository.findAndCount({
      skip: (params.page - 1) * params.limit,
      take: params.limit,
      where: where,
      order: params.sortOptions.reduce(
        (accumulator, sort) => ({
          ...accumulator,
          [sort.field]: sort.order,
        }),
        {},
      ),
      relations: relations,
    });

    return new Paginated({
      data: results,
      count,
      limit: params.limit,
      page: params.page,
    });
  }

  async baseFindAllPaginated(
    params: PaginatedQueryParams,
    relations: string[] = [],
  ): Promise<Paginated<DbEntity>> {
    const where: FindOptionsWhere<DbEntity>[] = [{}];

    params.filterOptions
      .filter((e) => e.value !== '')
      .forEach((filterOption) => {
        switch (filterOption.type) {
          case 'like':
            const valueFilter = filterOption.value as string;
            where[0][filterOption.field] = ILike(`%${valueFilter}%`);
            break;
          case 'in':
            where[0][filterOption.field] = In(
              filterOption.value as (string | number)[],
            );
            break;
          case 'between':
            where[0][filterOption.field] = Between(
              (filterOption.value as [number, number])[0],
              (filterOption.value as [number, number])[1],
            );
            break;
          case 'not':
            where[0][filterOption.field] = Not(filterOption.value);
            break;
          default:
            where[0][filterOption.field] = filterOption.value;
            break;
        }
      });

    const [results, count] = await this.repository.findAndCount({
      skip: (params.page - 1) * params.limit,
      take: params.limit,
      where: where,
      order: params.sortOptions.reduce(
        (accumulator, sort) => ({
          ...accumulator,
          [sort.field]: sort.order,
        }),
        {},
      ),
      relations: relations,
    });

    return new Paginated({
      data: results,
      count,
      limit: params.limit,
      page: params.page,
    });
  }
}
