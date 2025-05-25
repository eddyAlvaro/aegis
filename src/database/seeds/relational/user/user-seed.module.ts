import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserSeedService } from './user-seed.service';
import { RoleEntity } from '../../../../iam/infrastructure/persistence/relational/entities/role.entity';
import { UserEntity } from '../../../../modules/users-management/infraestructure/persistence/relational/entity/user.entity';
// import { OrganizationEntity } from '../../../../modules/organization-management/infrastructure/persistence/relational/entities/organization.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    TypeOrmModule.forFeature([RoleEntity]),
    // TypeOrmModule.forFeature([OrganizationEntity]),
  ],
  providers: [UserSeedService],
  exports: [UserSeedService],
})
export class UserSeedModule {}
