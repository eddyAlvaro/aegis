import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { routesV1 } from '../../../../config/app-routes';
import {
  Controller,
  Get,
  HttpStatus,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from '../../../../iam/infrastructure/persistence/relational/entities/role.entity';
import { Repository } from 'typeorm';
import { ApiErrorResponse } from '../../../../platform/api/api-error.response';
import { SimpleRoleResponseDto } from '../find-roles-paginated/dto/simple-role.response.dto';
import { CustomAuthGuard } from '@src/modules/shared-kernel/application/guards/custom-jwt-auth.guard';
import { AuthorizationGuard } from '@src/modules/shared-kernel/application/guards/authorization.guard';
import { Grants } from '@src/modules/shared-kernel/application/decorators/permissions';
import { GrantId } from '../../domain/types/grants';
import { applyFilters } from '@src/platform/utils/pagination/pagination-utils';
import { QueryRequestDto } from '@src/platform/api/query.request.dto';
import { RoleStatus } from '../../domain/types/role-status';

@ApiTags(routesV1.roleConfiguration.root)
@Controller(routesV1.version)
@UseGuards(CustomAuthGuard, AuthorizationGuard)
export class FindRolesHttpController {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly typeOrmRoleRepository: Repository<RoleEntity>,
  ) {}

  @ApiOperation({
    summary: 'Find roles',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SimpleRoleResponseDto,
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  @Get(routesV1.roleConfiguration.findRoles)
  // @Grants(GrantId.PlatformRolesCanView, GrantId.OrganizationRolesCanView)
  async create(
    @Query() query: QueryRequestDto,
    @Request() request: any,
  ): Promise<RoleEntity[]> {
    const queryBuilder = this.typeOrmRoleRepository
      .createQueryBuilder('role')
      .leftJoinAndSelect('role.organizations', 'organizations')
      .leftJoinAndSelect('role.users', 'user');

    const secureFilterOptions = query.filterOptions || [];
    console.log(`secureFilterOptions: ${JSON.stringify(secureFilterOptions)}`);

    // secureFilterOptions.push({
    //   type: 'not',
    //   field: 'role.id',
    //   value: SystemRole.SuperAdmin,
    // });
    //
    secureFilterOptions.push({
      type: 'equal',
      field: 'status',
      value: RoleStatus.Active,
    });

    applyFilters(queryBuilder, secureFilterOptions, 'role');
    //applySorts(queryBuilder, query.sortOptions, 'role');

    //queryBuilder.skip((query.page - 1) * query.limit).take(query.limit);

    const [records, count] = await queryBuilder.getManyAndCount();

    return records;
  }
}
