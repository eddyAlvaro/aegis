import { TypeOrmModule } from '@nestjs/typeorm';
import { allEntities } from '../../../config/all-entities';
import { Module } from '@nestjs/common';
import { CourseSeedService } from './course-seed.service';

@Module({
  imports: [TypeOrmModule.forFeature(allEntities)],
  providers: [CourseSeedService],
  exports: [CourseSeedService],
})
export class CourseSeedModule {}
