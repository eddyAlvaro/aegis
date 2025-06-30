import { forwardRef, Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMapper } from '../../../mapper/user.mapper';
import { USER_PROJECTION, USER_REPOSITORY } from '../../../di/tokens';
import { UserRepository } from './repositories/user.repository';
import { UserEntity } from './entity/user.entity';
import { UserProjection } from './projections/user.projection';
import { allEntities } from '@src/database/config/all-entities';

const mappers: Provider[] = [UserMapper];
const repositories: Provider[] = [
  { provide: USER_REPOSITORY, useClass: UserRepository },
  { provide: USER_PROJECTION, useClass: UserProjection },
];

@Module({
  imports: [TypeOrmModule.forFeature(allEntities)],
  providers: [...repositories, ...mappers],
  exports: [
    ...repositories,
    ...mappers,
    TypeOrmModule.forFeature([UserEntity]),
  ],
})
export class RelationalUserPersistenceModule {}
