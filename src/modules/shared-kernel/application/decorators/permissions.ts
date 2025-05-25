import { SetMetadata } from '@nestjs/common';
import { GrantId } from '@src/modules/role-configuration/domain/types/grants';

export const Grants = (...grants: (GrantId | null)[]) =>
  SetMetadata('grants', grants);
