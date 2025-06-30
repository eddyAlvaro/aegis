import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { allEntities } from '../../database/config/all-entities';
import { EnrollmentManagementHttpController } from './presentation/enrollment-management.http.controller';
import { EnrollmentManagementService } from './application/services/enrollment.management.service';
import { UsersManagementModule } from '../users-management/users-management.module';
import { CredentialsManagementModule } from '../creadentials-management/credentials-management.module';

@Module({
  imports: [
    UsersManagementModule,
    CredentialsManagementModule,
    TypeOrmModule.forFeature(allEntities),
  ],
  controllers: [EnrollmentManagementHttpController],
  providers: [EnrollmentManagementService],
  exports: [],
})
export class EnrollmentManagementModule {}
