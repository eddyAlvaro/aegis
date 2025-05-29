import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DrivingManagementHttpController } from './presentation/driving-management.http-controller';
import { DrivingManagementService } from './application/services/driving-management.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailModule } from '../../mail/mail.module';

import { allEntities } from '../../database/config/all-entities';
import { UsersManagementModule } from '../users-management/users-management.module';

const httpControllers = [DrivingManagementHttpController];

const commandHandlers: Provider[] = [];
const queryHandlers: Provider[] = [];
const services = [DrivingManagementService];

@Module({
  imports: [MailModule, CqrsModule, TypeOrmModule.forFeature(allEntities)],
  controllers: [...httpControllers],
  providers: [...commandHandlers, ...queryHandlers, ...services],
  exports: [],
})
export class DrivingModule {}
