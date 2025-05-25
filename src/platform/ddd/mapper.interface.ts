import { Entity } from './entity.base';

export interface Mapper<Domain extends Entity<any>, DbEntity> {
  domainToPersistence(domain: Domain): Promise<DbEntity>;
  persistenceToDomain(entity: DbEntity): Promise<Domain>;
}
