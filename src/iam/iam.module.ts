import { Module, OnModuleInit } from '@nestjs/common';
import { AccessControlModule, RolesBuilder } from 'nest-access-control';
import { RelationalRolePersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { GrantsService } from './application/grants.service';
import { AccessControlService } from '../auth/access-control.service';

@Module({
  imports: [
    AccessControlModule.forRoles(new RolesBuilder()),
    RelationalRolePersistenceModule,
  ],
  controllers: [
    // RolesController
  ],
  providers: [GrantsService, AccessControlService],
  exports: [GrantsService, AccessControlService],
})
export class IamModule implements OnModuleInit {
  constructor(readonly accessControlService: AccessControlService) {}
  onModuleInit() {
    this.accessControlService.refreshSystemGrants().catch((error) => {
      // TODO: add custom logger
      console.error(error);
    });
  }
}
