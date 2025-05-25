import { GlobalType } from '@src/iam/infrastructure/persistence/relational/entities/role.entity';
import { Request } from 'express';

export interface RequestTyped extends Request {
  user: { id: string; role: string };
  globalType: GlobalType;
  availableOrganizationIdList: string[];
}
