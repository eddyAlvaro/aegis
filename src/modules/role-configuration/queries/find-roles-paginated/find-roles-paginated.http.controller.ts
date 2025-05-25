import {
  Controller,
  Get,
  HttpStatus,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { QueryBus } from '@nestjs/cqrs';
import { Paginated } from '@platform/ddd';
import { PaginatedQueryRequestDto } from '../../../../platform/api/paginated-query.request.dto';
import { routesV1 } from '../../../../config/app-routes';
import { ApiErrorResponse } from '../../../../platform/api/api-error.response';
import { FindRolesResponseDto } from './dto/find-roles-paginated.response.dto';
import { FindRolesPaginatedQuery } from './find-roles-paginated.query';
import { RoleEntity } from '@src/iam/infrastructure/persistence/relational/entities/role.entity';
import { RoleMapper } from '../../mapper/role.mapper';
import { CustomAuthGuard } from '@src/modules/shared-kernel/application/guards/custom-jwt-auth.guard';
import { AuthorizationGuard } from '@src/modules/shared-kernel/application/guards/authorization.guard';
import { Grants } from '@src/modules/shared-kernel/application/decorators/permissions';
import { GrantId } from '../../domain/types/grants';
// import { ensureOrganizationMultipleFiltering } from '@src/platform/application/context/filter-organization';
import { buildDefaultSort } from '@src/platform/constants/default-sort';
import { RequestTyped } from '@src/platform/application/typed-request';

@ApiTags(routesV1.roleConfiguration.root)
@Controller(routesV1.version)
@UseGuards(CustomAuthGuard, AuthorizationGuard)
export class FindRolesPaginatedHttpController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly mapper: RoleMapper,
  ) {}

  @ApiOperation({
    summary: 'Find roles',
    description: '',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: FindRolesResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  @Get(routesV1.roleConfiguration.findRolesPaginated)
  // @Grants(GrantId.PlatformRolesCanView, GrantId.OrganizationRolesCanView)
  async create(
    @Query() queryParams: PaginatedQueryRequestDto,
    @Request() request: RequestTyped,
  ): Promise<any> {
    // const filterOptions = ensureOrganizationMultipleFiltering(
    //   request.availableOrganizationIdList,
    //   queryParams.filterOptions,
    // );
    // const query = new FindRolesPaginatedQuery({
    //   filterOptions: filterOptions,
    //   limit: queryParams.limit,
    //   page: queryParams.page,
    //   sortOptions: buildDefaultSort(queryParams.sortOptions),
    //   globalType: request.globalType,
    // });
    // const paginated: Paginated<RoleEntity> = await this.queryBus.execute(query);
    // return {
    //   count: paginated.count,
    //   limit: paginated.limit,
    //   page: paginated.page,
    //   data: paginated.data,
    // };
    // return new FindRolesResponseDto({
    //   count: paginated.count,
    //   limit: paginated.limit,
    //   page: paginated.page,
    //   data: paginated.data,
    //   data: await Promise.all(
    //     paginated.data.map((e) => this.mapper.persistenceToResponse(e)),
    //   ),
    // });
  }
}
