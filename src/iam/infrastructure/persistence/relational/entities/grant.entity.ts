import { Possession } from '../../../../domain/entities/possession';
import { Operation } from '../../../../domain/entities/operation';
import { Resource } from '../../../../domain/entities/resource';

export class Grant {
  resource: Resource;
  possession: Possession;
  operation: Operation;
  attributes: string[];
}
