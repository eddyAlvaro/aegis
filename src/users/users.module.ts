import { Module } from '@nestjs/common';
import { RelationalUserPersistenceModule } from './infrastructure/persistence/relational/relational-persistence.module';
import { FilesModule } from '../files/files.module';

const infrastructurePersistenceModule = RelationalUserPersistenceModule;

@Module({
  imports: [infrastructurePersistenceModule, FilesModule],
  controllers: [],
  providers: [],
  exports: [infrastructurePersistenceModule],
})
export class UsersModule {}
