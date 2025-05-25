export enum UserStatus {
  Suspended = 'SUSPENDED',
  Active = 'ACTIVE',
  Blocked = 'BLOCKED',
  NotVerified = 'NOT_VERIFIED',
}

export const userStatusMap: Record<UserStatus, { name: string }> = {
  [UserStatus.Suspended]: {
    name: 'Suspendido',
  },
  [UserStatus.Active]: {
    name: 'Activado',
  },
  [UserStatus.NotVerified]: {
    name: 'No verificado',
  },
  [UserStatus.Blocked]: {
    name: 'Bloqueado',
  },
};
