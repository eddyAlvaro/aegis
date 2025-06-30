import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { routesV1 } from '../../../config/app-routes';
import { PaginatedQueryRequestDto } from '../../../platform/api/paginated-query.request.dto';
import { UserManagementService } from '../application/services/user.management.service';
import { AuthorizationGuard } from '../../shared-kernel/application/guards/authorization.guard';
import { CustomAuthGuard } from '../../shared-kernel/application/guards/custom-jwt-auth.guard';
import { Grants } from '../../shared-kernel/application/decorators/permissions';
import { GrantId } from '../../role-configuration/domain/types/grants';

@ApiTags(routesV1.usersManagement.root)
@Controller(routesV1.version)
@UseGuards(CustomAuthGuard, AuthorizationGuard)
export class UserManagementHttpController {
  constructor(private readonly userManagementService: UserManagementService) {}

  @ApiOperation({ summary: 'View paginated users' })
  @Get(routesV1.usersManagement.findParticipantsPaginated)
  @Grants(GrantId.PlatformUsersCanViewParticipants)
  viewPaginatedUsers(
    @Query() requestDto: PaginatedQueryRequestDto,
  ): Promise<any> {
    console.log('requestDto', requestDto);
    return this.userManagementService.viewPaginatedUsers(requestDto);
  }
}
