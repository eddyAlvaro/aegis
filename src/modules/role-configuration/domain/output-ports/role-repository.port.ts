import { RepositoryPort } from '../../../../platform/ddd';
import { RoleDomain } from '../aggregates/role.domain';

export interface RoleRepositoryPort extends RepositoryPort<RoleDomain> {}
