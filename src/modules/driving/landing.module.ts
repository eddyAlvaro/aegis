import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { DrivingManagementHttpController } from './presentation/landing-management.http-controller';
import { DrivingManagementService } from './application/services/driving-management.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DrivingTrainingRecordEntity } from './infraestructure/persistence/relational/entity/driving-training-record.entity';
import { MailModule } from '../../mail/mail.module';
import { DrivingTrainingDailyLogEntity } from './infraestructure/persistence/relational/entity/driving-training-daily-log.entity';

const httpControllers = [DrivingManagementHttpController];

const commandHandlers: Provider[] = [];
const queryHandlers: Provider[] = [];
const services = [DrivingManagementService];

@Module({
  imports: [
    MailModule,
    CqrsModule,
    TypeOrmModule.forFeature([
      DrivingTrainingRecordEntity,
      DrivingTrainingDailyLogEntity,
    ]),
  ],
  controllers: [...httpControllers],
  providers: [...commandHandlers, ...queryHandlers, ...services],
  exports: [],
})
export class DrivingModule {}
