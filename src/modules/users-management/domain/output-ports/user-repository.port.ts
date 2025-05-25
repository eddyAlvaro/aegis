import { RepositoryPort } from '../../../../platform/ddd';
import * as O from 'fp-ts/Option';
import { UserDomain } from '../aggregates/user.domain';

export interface UserRepositoryPort extends RepositoryPort<UserDomain> {
  findOneByEmail(id: string): Promise<O.Option<UserDomain>>;
  findOneById(id: string): Promise<O.Option<UserDomain>>;
}
