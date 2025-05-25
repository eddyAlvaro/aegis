import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { routesV1 } from '../../../../config/app-routes';
import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from '../../../../iam/infrastructure/persistence/relational/entities/role.entity';
import { Repository } from 'typeorm';
import { ApiErrorResponse } from '../../../../platform/api/api-error.response';
import { getGrantPropsList } from '../../domain/types/grants';

@ApiTags(routesV1.roleConfiguration.root)
@Controller(routesV1.version)
export class FindGrantsHttpController {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly typeormRoleRepository: Repository<RoleEntity>,
  ) {}

  @ApiOperation({
    summary: 'Find grants',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  @Get(routesV1.roleConfiguration.findGrants)
  create(@Query('type') type: 'platform' | 'organization'): any {
    return getGrantPropsList(type);
  }
}
