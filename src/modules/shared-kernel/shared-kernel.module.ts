import { Global, Module, Provider } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { RelationalSharedKernelPersistenceModule } from './infraestructure/persistence/relational/relational-persistence.module';
import { GetCarBrandsHttpController } from './queries/get-car-brands/get-car-brands.http.controller';
import { GetCarModelsHttpController } from './queries/get-car-models/get-car-models.http.controller';
// import { SocketIoService } from './infraestructure/realtime/socket-io.service';
import { WEBSOCKET_SERVICE_OUTPUT_PORT } from './di/tokens';
import { AuditableEventService } from './application/services/auditable-event.service';

const httpControllers = [
  GetCarBrandsHttpController,
  GetCarModelsHttpController,
];
// const applicationProviders: Provider[] = [
//   { provide: WEBSOCKET_SERVICE_OUTPUT_PORT, useClass: SocketIoService },
// ];

const commandHandlers: Provider[] = [];
const services: Provider[] = [AuditableEventService];

@Global()
@Module({
  imports: [CqrsModule, RelationalSharedKernelPersistenceModule],
  controllers: [...httpControllers],
  providers: [...commandHandlers, ...services],
  exports: [
    RelationalSharedKernelPersistenceModule,
    // ...applicationProviders,
    ...services,
  ],
})
export class SharedKernelManagementModule {}
