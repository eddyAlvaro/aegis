import { Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { FindRolesHttpController } from './queries/find-roles/find-roles.http.controller';
import { RelationalRolePersistenceModule } from './infraestructure/persistence/relational/relational-persistence.module';
import { FindRolesPaginatedHttpController } from './queries/find-roles-paginated/find-roles-paginated.http.controller';
import { CreateRoleHttpController } from './commands/create-role/create-role.http-controller';
// import { FindRolesPaginatedUseCase } from './queries/find-roles-paginated/find-roles-paginated.use-case';
import { FindGrantsHttpController } from './queries/find-grants/find-grants.http.controller';
import { UpdateRoleHttpController } from './commands/update-role/update-role.http-controller';
import { GetRoleDetailHttpController } from './queries/get-role-detail/get-role-detail.http.controller';
import { DeleteRoleHttpController } from './commands/delete-role/delete-role.http-controller';

const httpControllers = [
  FindRolesHttpController,
  FindRolesPaginatedHttpController,
  CreateRoleHttpController,
  FindGrantsHttpController,
  DeleteRoleHttpController,
  UpdateRoleHttpController,
  GetRoleDetailHttpController,
];

const commandHandlers: Provider[] = [];
// const queryHandlers: Provider[] = [FindRolesPaginatedUseCase];

@Module({
  imports: [CqrsModule, RelationalRolePersistenceModule],
  controllers: [...httpControllers],
  providers: [...commandHandlers],
  exports: [RelationalRolePersistenceModule],
})
export class RoleConfigurationModule {}
