import { GlobalType } from '@src/iam/infrastructure/persistence/relational/entities/role.entity';
import {
  PaginatedParams,
  PaginatedQueryBase,
} from '../../../../platform/ddd/query.base';

export class FindRolesPaginatedQuery extends PaginatedQueryBase {
  globalType: GlobalType;
  constructor(props: PaginatedParams<FindRolesPaginatedQuery>) {
    super(props);
    this.globalType = props.globalType;
  }
}
