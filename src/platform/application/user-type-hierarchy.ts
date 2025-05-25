import { UserType } from '@src/modules/users-management/domain/types/user-type';

export const userTypeHierarchy: UserType[] = [
  UserType.SuperAdmin,
  UserType.PlatformAdmin,
  UserType.PlatformUser,
  UserType.OrganizationAdmin,
  UserType.OrganizationUser,
  UserType.Participant,
];

export const isHigherUserType = (
  userType: UserType,
  comparedUserType: UserType,
): boolean => {
  return (
    userTypeHierarchy.indexOf(userType) >
    userTypeHierarchy.indexOf(comparedUserType)
  );
};

export const isHigherOrEqualUserType = (
  userType: UserType,
  comparedUserType: UserType,
): boolean => {
  return (
    userTypeHierarchy.indexOf(userType) >=
    userTypeHierarchy.indexOf(comparedUserType)
  );
};
