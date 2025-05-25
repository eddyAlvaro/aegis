// import { Inject } from '@nestjs/common';
// import { Paginated } from '../../../../platform/ddd';
// import { FindRolesPaginatedQuery } from './find-roles-paginated.query';
// import { ROLE_PROJECTION } from '../../di/tokens';
// import {
//   GlobalType,
//   RoleEntity,
// } from '@src/iam/infrastructure/persistence/relational/entities/role.entity';
// import { RoleProjection } from '../../infraestructure/persistence/relational/projections/role.projection';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import {
//   applyFilters,
//   applySorts,
// } from '@src/platform/utils/pagination/pagination-utils';
// import { SystemRole } from '@src/iam/domain/system-role';
// import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

// @QueryHandler(FindRolesPaginatedQuery)
// export class FindRolesPaginatedUseCase implements IQueryHandler {
//   constructor(
//     @Inject(ROLE_PROJECTION)
//     protected readonly roleProjection: RoleProjection,
//     @InjectRepository(RoleEntity)
//     protected readonly roleRepository: Repository<RoleEntity>,
//   ) {}

//   // async execute(
//   //   query: FindRolesPaginatedQuery,
//   // ): Promise<Paginated<RoleEntity>> {
//   //   const queryBuilder = this.roleRepository
//   //     .createQueryBuilder('role')
//   //     // .leftJoinAndSelect('role.organizations', 'organizations')
//   //     .leftJoinAndSelect('role.users', 'user');

//   //   query.filterOptions.push({
//   //     type: 'not',
//   //     field: 'role.id',
//   //     value: SystemRole.SuperAdmin,
//   //   });

//   //   if (query.globalType === GlobalType.Platform) {
//   //     const filterOrganizationIndex = query.filterOptions.findIndex(
//   //       (filter) => filter.field === 'organizations.id',
//   //     );
//   //     query.filterOptions.push({
//   //       type: 'equal',
//   //       field: 'type',
//   //       value: GlobalType.Platform,
//   //     });
//   //     if (filterOrganizationIndex > -1) {
//   //       query.filterOptions.splice(filterOrganizationIndex, 1);
//   //     }
//   //     queryBuilder.loadRelationCountAndMap('role.userCount', 'role.users');
//   //   } else {
//   //     const filterOrganization = query.filterOptions.find(
//   //       (filter) => filter.field === 'organizations.id',
//   //     );
//   //     query.filterOptions.push({
//   //       type: 'equal',
//   //       field: 'type',
//   //       value: GlobalType.Organization,
//   //     });
//   //     if (filterOrganization) {
//   //       queryBuilder.loadRelationCountAndMap(
//   //         'role.userCount',
//   //         'role.users',
//   //         'user',
//   //         (qb) =>
//   //           qb
//   //             .leftJoin('user.organizations', 'userOrganizations')
//   //             .where('userOrganizations.id IN (:...organizationIds)', {
//   //               organizationIds: filterOrganization.value,
//   //             }),
//   //       );
//   //     } else {
//   //       queryBuilder.loadRelationCountAndMap('role.userCount', 'role.users');
//   //     }
//   //   }

//   //   applyFilters(queryBuilder, query.filterOptions, 'role');
//   //   applySorts(queryBuilder, query.sortOptions, 'role');

//   //   queryBuilder.skip((query.page - 1) * query.limit).take(query.limit);

//   //   const [records, count] = await queryBuilder.getManyAndCount();

//   //   const recordsWitUserCount: any[] = records.map((event) => ({
//   //     ...event,
//   //     userCount: (event as any).userCount,
//   //   }));

//   //   return new Paginated({
//   //     data: recordsWitUserCount,
//   //     count: count,
//   //     limit: query.limit,
//   //     page: query.page,
//   //   });
//   // }
// }
