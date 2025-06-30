import { forwardRef, Module, Provider } from '@nestjs/common';
import { SessionModule } from '../../session/session.module';
import { UsersManagementModule } from '../users-management/users-management.module';
import { JwtModule } from '@nestjs/jwt';
import { RelationalUserPersistenceModule } from '../users-management/infraestructure/persistence/relational/relational-persistence.module';
import { CredentialManagementHttpController } from './presentation/credential-management.http-controller';
import { CredentialManagementService } from './application/credential-management.service';
import { LoginManagementService } from './application/login-management.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { allEntities } from '../../database/config/all-entities';

const services = [CredentialManagementService, LoginManagementService];
const outputPorts: Provider[] = [];

@Module({
  imports: [
    TypeOrmModule.forFeature(allEntities),
    forwardRef(() => UsersManagementModule),
    JwtModule.register({}),
    RelationalUserPersistenceModule,
    SessionModule,
  ],
  controllers: [CredentialManagementHttpController],
  providers: [...services, ...outputPorts],
  exports: [...services],
})
export class CredentialsManagementModule {}
