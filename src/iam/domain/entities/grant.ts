// { role: 'admin', resource: 'video', action: 'delete:any', attributes: '*' },
import { Resource } from './resource';
import { Possession } from './possession';
import { Operation } from './operation';

export class Grant {
  resource: Resource;
  possession: Possession;
  operation: Operation;
  attributes: string[];
  public get action() {
    return `${this.operation}:${this.possession}`;
  }
}
