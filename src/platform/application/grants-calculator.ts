// import { QueryBus } from '@nestjs/cqrs';
// import { GetUserGrantsQuery } from '@src/modules/credentials-management/queries/get-my-grants/get-grants.query';
// import {
//   getGrantIdList,
//   GrantId,
// } from '@src/modules/role-configuration/domain/types/grants';
// import { UserType } from '@src/modules/users-management/domain/types/user-type';
// import { UserDto } from '@src/modules/users-management/dto/user.dto';

// export const calculateGrantsAndOrganizationList = async (
//   userDto: UserDto,
//   queryBus: QueryBus,
// ): Promise<[GrantId[], string[]]> => {
//   let grantIdList: GrantId[] = [];

//   if ([UserType.SuperAdmin, UserType.PlatformAdmin].includes(userDto.type)) {
//     grantIdList = getGrantIdList('platform');
//     const allOrganizations: OrganizationEntity[] = await queryBus.execute(
//       new FindOrganizationsQuery({ filterOptions: [], sortOptions: [] }),
//     );
//     availableOrganizationIdList = allOrganizations.map((o) => o.id);
//   } else if ([UserType.OrganizationAdmin].includes(userDto.type)) {
//     grantIdList = getGrantIdList('organization');
//     availableOrganizationIdList = userDto.organizations.map((o) => o.id);
//   } else {
//     grantIdList = await queryBus.execute(
//       new GetUserGrantsQuery({ userId: userDto.id }),
//     );

//     //console.log(`grantIdList, ${JSON.stringify(grantIdList)}`);
//     availableOrganizationIdList = userDto.organizations.map((o) => o.id);
//     // console.log(
//     //   `availableOrganizationIdList, ${JSON.stringify(availableOrganizationIdList)}`,
//     // );
//   }
//   return [grantIdList, availableOrganizationIdList];
// };
