export enum UserType {
  SuperAdmin = 'SUPER_ADMIN',
  PlatformAdmin = 'PLATFORM_ADMIN',
  PlatformUser = 'PLATFORM_USER',

  OrganizationAdmin = 'ORGANIZATION_ADMIN',
  OrganizationUser = 'ORGANIZATION_USER',

  Participant = 'PARTICIPANT',
}

export type OcasionEnv = 'organization' | 'platform' | 'participant';

export const userTypeMap: Record<
  UserType,
  { priority: number; env: OcasionEnv; name: string }
> = {
  [UserType.SuperAdmin]: {
    priority: 0,
    name: 'Super Admin',
    env: 'platform',
  },
  [UserType.PlatformAdmin]: {
    priority: 1,
    name: 'Administrador de Plataforma',
    env: 'platform',
  },
  [UserType.PlatformUser]: {
    priority: 2,
    name: 'Usuario de Plataforma',
    env: 'platform',
  },
  [UserType.OrganizationAdmin]: {
    priority: 3,
    env: 'organization',
    name: 'Administrador de Organización',
  },
  [UserType.OrganizationUser]: {
    priority: 4,
    env: 'organization',
    name: 'Usuario de Organización',
  },
  [UserType.Participant]: {
    priority: 5,
    env: 'participant',
    name: 'Participante',
  },
};

export const getUserTypePropsList = (
  type: OcasionEnv,
): {
  id: string;
  priority: number;
  env: OcasionEnv;
  name: string;
}[] => {
  return Object.keys(userTypeMap)
    .filter((key) => userTypeMap[key as UserType].env === type) // Casting explícito a GrantId
    .map((key) => ({
      id: key,
      name: userTypeMap[key as UserType].name,
      env: userTypeMap[key as UserType].env,
      priority: userTypeMap[key as UserType].priority,
    })); // Convertir el string a GrantId
};

export const getUserTypesByPriority = (
  priority: number,
): {
  id: string;
  priority: number;
  env: OcasionEnv;
  name: string;
}[] => {
  return Object.keys(userTypeMap)
    .filter((key) => userTypeMap[key as UserType].priority >= priority) // Casting explícito a GrantId
    .filter((key) => key !== UserType.Participant) // Casting explícito a GrantId
    .map((key) => ({
      id: key,
      name: userTypeMap[key as UserType].name,
      env: userTypeMap[key as UserType].env,
      priority: userTypeMap[key as UserType].priority,
    })); // Convertir el string a GrantId
};
