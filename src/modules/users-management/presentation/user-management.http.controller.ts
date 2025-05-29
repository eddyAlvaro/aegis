import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UserManagementService } from '../application/services/user.management.service';
import { Controller, Get, Query } from '@nestjs/common';
import { routesV1 } from '../../../config/app-routes';
import { PaginatedQueryRequestDto } from '../../../platform/api/paginated-query.request.dto';

@ApiTags(routesV1.usersManagement.root)
@Controller(routesV1.version)
export class UserManagementHttpController {
  constructor(private readonly userManagementService: UserManagementService) {}

  @ApiOperation({ summary: 'View paginated users' })
  @Get(routesV1.usersManagement.findParticipantsPaginated)
  viewPaginatedUsers(
    @Query() requestDto: PaginatedQueryRequestDto,
  ): Promise<any> {
    return this.userManagementService.viewPaginatedUsers(requestDto);
  }
}
