import {
  getGrantIdList,
  GrantId,
} from '@src/modules/role-configuration/domain/types/grants';
import { UserType } from '@src/modules/users-management/domain/types/user-type';
import { UserDto } from '@src/modules/users-management/dto/user.dto';
import { CredentialManagementService } from '../../modules/creadentials-management/application/credential-management.service';

export const calculateGrantsAndOrganizationList = async (
  userDto: UserDto,
  credentialManagementService: CredentialManagementService,
): Promise<[GrantId[]]> => {
  let grantIdList: GrantId[] = [];

  if ([UserType.SuperAdmin, UserType.PlatformAdmin].includes(userDto.type)) {
    grantIdList = getGrantIdList('platform');
  } else {
    // grantIdList = await queryBus.execute(
    //   new GetUserGrantsQuery({ userId: userDto.id }),
    // );

    grantIdList = await credentialManagementService.getUserGrants(userDto.id);

    //console.log(`grantIdList, ${JSON.stringify(grantIdList)}`);

    // console.log(
    //   `availableOrganizationIdList, ${JSON.stringify(availableOrganizationIdList)}`,
    // );
  }
  return [grantIdList];
};
