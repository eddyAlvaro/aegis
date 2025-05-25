import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { GrantId } from '@src/modules/role-configuration/domain/types/grants';
import { Reflector } from '@nestjs/core/services/reflector.service';
// import { UserDto } from '@src/modules/users-management/dto/user.dto';
import {
  UserNotAuthorized,
  UserSuspended,
} from '../../domain/failures/shared-kernel.failures';
// import { calculateGrantsAndOrganizationList } from '@src/platform/application/grants-calculator';
import { UserType } from '@src/modules/users-management/domain/types/user-type';
import { UserStatus } from '@src/modules/users-management/domain/types/user-status';
import { GlobalType } from '@src/iam/infrastructure/persistence/relational/entities/role.entity';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly queryBus: QueryBus,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // const request = context.switchToHttp().getRequest();

    // const user = request.user;

    // const [platformPermission, organizationPermission] = this.reflector.get<
    //   (GrantId | null)[]
    // >('grants', context.getHandler());

    // // Obtain user detail
    // // const userDto: UserDto = await this.queryBus.execute(
    // //   new GetUserDetailQuery({ field: 'id', value: user.id }),
    // // );

    // if (userDto.status === UserStatus.Suspended) {
    //   throw new UserSuspended();
    // }

    // const [grantIdList, availableOrganizationIdList] =
    //   await calculateGrantsAndOrganizationList(userDto, this.queryBus);

    // request.availableOrganizationIdList = availableOrganizationIdList;

    // if (
    //   [UserType.OrganizationAdmin, UserType.OrganizationUser].includes(
    //     userDto.type,
    //   )
    // ) {
    //   request.type = 'organization';
    //   request.globalType = GlobalType.Organization;
    // } else {
    //   request.type = 'platform';
    //   request.globalType = GlobalType.Platform;
    // }

    // const isPlatformPermissionSatisfied =
    //   platformPermission && grantIdList.includes(platformPermission);
    // const isOrganizationPermissionSatisfied =
    //   organizationPermission && grantIdList.includes(organizationPermission);
    // // console.log(`grantIdList -> ${grantIdList}`);
    // // console.log(`OP -> ${organizationPermission}`);
    // // console.log(`PP -> ${platformPermission}`);
    // // console.log(`isOpOk -> ${isOrganizationPermissionSatisfied}`);
    // // console.log(`isPpOk -> ${isPlatformPermissionSatisfied}`);

    // if (!(isPlatformPermissionSatisfied || isOrganizationPermissionSatisfied)) {
    //   throw new UserNotAuthorized();
    // }

    // request.grantIdList = grantIdList;

    return true;
  }
}
