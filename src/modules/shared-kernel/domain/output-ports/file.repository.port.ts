import { RepositoryPort } from '../../../../platform/ddd';
import { FileDomain } from '../value-objects/file.domain';
import * as O from 'fp-ts/Option';

export interface FileRepositoryPort extends RepositoryPort<FileDomain> {
  findOneById(id: string): Promise<O.Option<FileDomain>>;
}
