import { Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileMapper } from '../../../mapper/file.mapper';
import { CAR_MODEL_PROJECTION, FILE_REPOSITORY } from '../../../di/tokens';
import { FileRepository } from './repositories/file.repository';
// import { CarModelProjection } from './projections/car-model.projection';
import { allEntities } from '@src/database/config/all-entities';

const mappers: Provider[] = [FileMapper];

// const projections: Provider[] = [
//   { provide: CAR_MODEL_PROJECTION, useClass: CarModelProjection },
// ];
const repositories: Provider[] = [
  { provide: FILE_REPOSITORY, useClass: FileRepository },
];

@Module({
  imports: [TypeOrmModule.forFeature(allEntities)],
  providers: [...repositories, ...mappers],
  exports: [
    // ...projections,
    ...repositories,
    ...mappers,
    TypeOrmModule.forFeature(allEntities),
  ],
})
export class RelationalSharedKernelPersistenceModule {}
