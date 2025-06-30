import { forwardRef, Module, Provider } from '@nestjs/common';
import { RelationalUserPersistenceModule } from './infraestructure/persistence/relational/relational-persistence.module';
import { UserEntity } from './infraestructure/persistence/relational/entity/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegisterEnrollmentHttpController } from './presentation/register-participant/register-enrollment.http.controller';
import { UserManagementService } from './application/services/user.management.service';
import { DrivingModule } from '../driving-management/driving.module';
import { MailModule } from '../../mail/mail.module';
import { UserManagementHttpController } from './presentation/user-management.http.controller';
import { SharedKernelManagementModule } from '../shared-kernel/shared-kernel.module';
import { CredentialsManagementModule } from '../creadentials-management/credentials-management.module';

const services = [UserManagementService];
const outputPorts: Provider[] = [];
const httpControllers = [
  RegisterEnrollmentHttpController,
  UserManagementHttpController,
];
@Module({
  imports: [
    DrivingModule,
    MailModule,
    RelationalUserPersistenceModule,
    forwardRef(() => SharedKernelManagementModule),
    forwardRef(() => CredentialsManagementModule), // 👈 NECESARIO
  ],
  controllers: [...httpControllers],
  providers: [...outputPorts, ...services],
  exports: [...services],
})
export class UsersManagementModule {}
