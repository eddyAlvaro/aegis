import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from '../../../../../iam/infrastructure/persistence/relational/entities/role.entity';
import {
  ROLE_PROJECTION,
  ROLE_REPOSITORY,
} from '@src/modules/role-configuration/di/tokens';
import { RoleProjection } from './projections/role.projection';
import { RoleRepository } from './repositories/role.repository';
import { RoleMapper } from '@src/modules/role-configuration/mapper/role.mapper';
import { UserEntity } from '@src/modules/users-management/infraestructure/persistence/relational/entity/user.entity';

const mappers: Provider[] = [RoleMapper];
const repositories: Provider[] = [
  {
    provide: ROLE_PROJECTION,
    useClass: RoleProjection,
  },
  {
    provide: ROLE_REPOSITORY,
    useClass: RoleRepository,
  },
];

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity, UserEntity])],
  providers: [...repositories, ...mappers],
  exports: [
    ...repositories,
    ...mappers,
    TypeOrmModule.forFeature([RoleEntity]),
  ],
})
export class RelationalRolePersistenceModule {}
