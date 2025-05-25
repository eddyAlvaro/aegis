import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiErrorResponse } from '@platform/api/api-error.response';
import { IdResponse } from '@platform/api/id.response.dto';
import { routesV1 } from '../../../../config/app-routes';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from '@src/iam/infrastructure/persistence/relational/entities/role.entity';
import { DeleteRoleRequestDto } from './dto/delete-role.request.dto';
import { GrantId } from '../../domain/types/grants';

import { CustomAuthGuard } from '@src/modules/shared-kernel/application/guards/custom-jwt-auth.guard';
import { AuthorizationGuard } from '@src/modules/shared-kernel/application/guards/authorization.guard';
import { Grants } from '@src/modules/shared-kernel/application/decorators/permissions';
import { SystemRole } from '@src/iam/domain/system-role';
import { CannotDeleteSystemRole } from '../../domain/failures/role.failures';

@ApiTags(routesV1.roleConfiguration.root)
@Controller(routesV1.version)
@UseGuards(CustomAuthGuard, AuthorizationGuard)
export class DeleteRoleHttpController {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly typeormRoleRepository: Repository<RoleEntity>,
  ) {}

  @ApiOperation({ summary: 'Delete a role' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  @Post(routesV1.roleConfiguration.deleteRole)
  // @Grants(GrantId.PlatformRolesCanDelete, GrantId.OrganizationRolesCanDelete)
  async delete(@Body() body: DeleteRoleRequestDto): Promise<void> {
    if (Object.values(SystemRole).includes(body.id as SystemRole)) {
      throw new CannotDeleteSystemRole();
    }
    await this.typeormRoleRepository.delete({ id: body.id });
  }
}
