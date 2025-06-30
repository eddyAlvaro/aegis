import { Controller, Post, Body } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { routesV1 } from '@src/config/app-routes';
import { LoginUserRequestDto } from '../application/dtos/login-user.request.dto';
import { LoginManagementService } from '../application/login-management.service';
import { UserManagementService } from '../../users-management/application/services/user.management.service';

@ApiTags(routesV1.authManagement.root)
@Controller(routesV1.version)
export class CredentialManagementHttpController {
  constructor(
    private readonly loginManagementService: LoginManagementService,
    private readonly userManagementService: UserManagementService,
  ) {}

  @ApiOperation({ summary: 'Login user' })
  @Post(routesV1.authManagement.loginUser)
  async loginUser(@Body() bodyParams: LoginUserRequestDto) {
    const loginUserResult =
      await this.loginManagementService.loginUser(bodyParams);

    const getUserDetailResult = await this.userManagementService.getUserDetail({
      field: 'email',
      value: bodyParams.email,
    });
    return {
      token: loginUserResult.token,
      user: {
        id: getUserDetailResult.id,
        firstName: getUserDetailResult.firstName,
        lastName: getUserDetailResult.lastName,
        type: getUserDetailResult.type,
        email: getUserDetailResult.email,
        commonName: getUserDetailResult.commonName,
      },
    };
  }
}
