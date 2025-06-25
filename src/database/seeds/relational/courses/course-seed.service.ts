import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CoursesEntity } from '../../../../modules/driving-management/infraestructure/persistence/relational/entity/training/courses.entity';
import { DeepPartial, Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import { coursesData } from './data/courses-data';

@Injectable()
export class CourseSeedService {
  constructor(
    @InjectRepository(CoursesEntity)
    private typeOrmCoursesRepository: Repository<CoursesEntity>,
  ) {}

  async runCommon(): Promise<void> {
    const count = await this.typeOrmCoursesRepository.count();

    if (count === 0) {
      const entities = await this.createEntitiesFromData();
      await this.typeOrmCoursesRepository.save(entities);
    }
  }

  private async createEntitiesFromData() {
    return Promise.all(
      coursesData.map((course) =>
        this.buildDbEntity({
          name: course.name,
          type: course.type,
          hours: course.hours,
          position: course.position,
        }),
      ),
    );
  }

  private async buildDbEntity(values: DeepPartial<CoursesEntity>) {
    return Promise.resolve(
      this.typeOrmCoursesRepository.create({
        id: randomUUID(),
        name: values.name,
        type: values.type,
        hours: values.hours,
        position: values.position,
      }),
    );
  }
}
