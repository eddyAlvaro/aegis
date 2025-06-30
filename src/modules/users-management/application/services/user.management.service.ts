import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../infraestructure/persistence/relational/entity/user.entity';
import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';
import { QueryRequestDto } from '../../../../platform/api/query.request.dto';
import { PaginatedQueryRequestDto } from '../../../../platform/api/paginated-query.request.dto';
import { record } from 'zod';
import { count } from 'console';
import { FilterOptions, Paginated } from '../../../../platform/ddd';
import { UserType } from '../../domain/types/user-type';
import {
  applyFilters,
  applySorts,
} from '../../../../platform/utils/pagination/pagination-utils';
import { buildDefaultSort } from '../../../../platform/constants/default-sort';
import { UserNotFoundFailure } from '../../domain/failures/user.failure';
import { queryObjects } from 'v8';

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

    this.processCustomFilters(queryBuilder, query.filterOptions || []);
    applyFilters(queryBuilder, query.filterOptions || [], 'user');
    applySorts(queryBuilder, buildDefaultSort(query.sortOptions), 'user');

    return queryBuilder;
  }

  private processCustomFilters(
    queryBuilder: SelectQueryBuilder<UserEntity>,
    filterOptions: FilterOptions[],
  ) {
    const cunstomIndex = filterOptions.findIndex(
      (e) => e.field === 'quickSearch',
    );

    if (cunstomIndex > -1) {
      const customSearchFilter = filterOptions.splice(cunstomIndex, 1)[0];
      if (customSearchFilter.value) {
        const searchValue = `%${customSearchFilter.value}%`;
        queryBuilder.andWhere(
          new Brackets((qb) => {
            qb.where('user.commonName ILIKE :search', {
              search: searchValue,
            })
              .orWhere('user.documentIdentifier LIKE :search', {
                search: searchValue,
              })
              .orWhere('user.phoneNumber LIKE :search', {
                search: searchValue,
              })
              .orWhere('user.email LIKE :search', {
                search: searchValue,
              });
          }),
        );
      }
    }
  }
  async viewPaginatedUsers(query: PaginatedQueryRequestDto): Promise<any> {
    const queryBuilder = this.buildQueryBuilder(query);
    queryBuilder.andWhere('user.type = :type', { type: UserType.Participant });
    queryBuilder.skip((query.page - 1) * query.limit).take(query.limit);

    const [records, count] = await queryBuilder.getManyAndCount();

    return new Paginated({
      data: records,
      count: count,
      page: query.page,
      limit: query.limit,
    });
  }

  async getUserDetail(user: {
    field: string;
    value: string;
  }): Promise<UserEntity> {
    const findUser = await this.typeOrmUserRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.roles', 'roles')
      // .where('user.' + user.field + ':email ', { email: user.value })
      .where(`user.${user.field} = :value`, { value: user.value })
      .getOne();

    if (!findUser) {
      throw new UserNotFoundFailure();
    }

    return findUser;
  }
}
