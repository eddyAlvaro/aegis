import { Module, Provider } from '@nestjs/common';
import { RelationalUserPersistenceModule } from './infraestructure/persistence/relational/relational-persistence.module';
import { UserEntity } from './infraestructure/persistence/relational/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterEnrollmentHttpController } from './presentation/register-participant/register-enrollment.http.controller';
import { DrivingModule } from '../driving/landing.module';

@Module({
  imports: [RelationalUserPersistenceModule],
  providers: [],
})
export class UsersManagementModule {}
