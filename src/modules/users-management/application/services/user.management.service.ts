import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../infraestructure/persistence/relational/entity/user.entity';
import { Repository } from 'typeorm';
import { QueryRequestDto } from '../../../../platform/api/query.request.dto';
import { PaginatedQueryRequestDto } from '../../../../platform/api/paginated-query.request.dto';
import { record } from 'zod';
import { count } from 'console';
import { Paginated } from '../../../../platform/ddd';
import { UserType } from '../../domain/types/user-type';

@Injectable()
export class UserManagementService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly typeOrmUserRepository: Repository<UserEntity>,
  ) {}

  private buildCommonQueryBuilder() {
    const queryBuilder = this.typeOrmUserRepository.createQueryBuilder('user');

    return queryBuilder;
  }

  private buildQueryBuilder(query: QueryRequestDto | PaginatedQueryRequestDto) {
    const queryBuilder = this.buildCommonQueryBuilder();

    // this.processCustomFilters(queryBuilder, query.filterOptions || []);
    // applyFilters(
    //   queryBuilder,
    //   query.filterOptions || [],
    //   'payment',
    //   this.logger,
    // );
    // applySorts(
    //   queryBuilder,
    //   buildDefaultSort(query.sortOptions, [
    //     {
    //       order: 'desc',
    //       field: 'event.createdAt',
    //     },

    //     {
    //       order: 'desc',
    //       field: 'offer.createdAt',
    //     },
    //   ]),
    //   'payment',
    // );

    return queryBuilder;
  }

  async viewPaginatedUsers(query: PaginatedQueryRequestDto): Promise<any> {
    const queryBuilder = this.buildQueryBuilder(query);
    queryBuilder.where('user.type = :type', { type: UserType.Participant });
    queryBuilder.skip((query.page - 1) * query.limit).take(query.limit);

    const [records, count] = await queryBuilder.getManyAndCount();
    console.log('queryBuilder', records);

    return new Paginated({
      data: records,
      count: count,
      page: query.page,
      limit: query.limit,
    });
  }
}
