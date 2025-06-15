import { IsDefined } from 'class-validator';
import { CourseDto } from './course-dto';
import { CoursesEntity } from '../../infraestructure/persistence/relational/entity/training/courses.entity';

export class UpdateCoursesForLicenseCategoryDto {
  @IsDefined()
  id: string;

  @IsDefined()
  courses: CoursesEntity[];
}
