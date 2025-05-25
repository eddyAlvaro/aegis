import { UserEntity } from '@src/modules/users-management/infraestructure/persistence/relational/entity/user.entity';

export class Session {
  id: string;
  user: UserEntity;
  hash: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}
