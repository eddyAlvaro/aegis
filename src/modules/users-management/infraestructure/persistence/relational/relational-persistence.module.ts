import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserMapper } from '../../../mapper/user.mapper';
import { USER_PROJECTION, USER_REPOSITORY } from '../../../di/tokens';
import { UserRepository } from './repositories/user.repository';
import { UserEntity } from './entity/user.entity';
import { UserProjection } from './projections/user.projection';
import { allEntities } from '@src/database/config/all-entities';
import { RegisterEnrollmentHttpController } from '../../../presentation/register-participant/register-enrollment.http.controller';
import { MailModule } from '../../../../../mail/mail.module';
import { DrivingModule } from '../../../../driving-management/driving.module';
import { UserManagementHttpController } from '../../../presentation/user-management.http.controller';
import { UserManagementService } from '../../../application/services/user.management.service';

const mappers: Provider[] = [UserMapper];
const repositories: Provider[] = [
  { provide: USER_REPOSITORY, useClass: UserRepository },
  { provide: USER_PROJECTION, useClass: UserProjection },
];
const services = [UserManagementService];

@Module({
  imports: [TypeOrmModule.forFeature(allEntities), MailModule, DrivingModule],
  providers: [...repositories, ...mappers, ...services],
  controllers: [RegisterEnrollmentHttpController, UserManagementHttpController],

  exports: [
    ...repositories,
    ...mappers,
    ...services,
    TypeOrmModule.forFeature([UserEntity]),
  ],
})
export class RelationalUserPersistenceModule {}
