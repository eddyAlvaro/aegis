import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserEntity } from '../../users-management/infraestructure/persistence/relational/entity/user.entity';
import { routesV1 } from '../../../config/app-routes';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { EnrollmentManagementService } from '../application/services/enrollment.management.service';
import { EnrollmentUserDto } from '../application/dtos/enrollment-user-dto';

@ApiTags(routesV1.enrollmentManagement.root)
@Controller(routesV1.version)
export class EnrollmentManagementHttpController {
  constructor(
    private readonly enrollmentManagementService: EnrollmentManagementService,
  ) {}
  @ApiOperation({ summary: 'Register enrollment student' })
  @Post(routesV1.enrollmentManagement.registerStudent)
  enrollmentStudent(@Body() body: EnrollmentUserDto) {
    console.log('body', body);
    return this.enrollmentManagementService.createEnrollmentStudent(body);
  }

  @ApiOperation({ summary: 'Update enrollment student' })
  @Post(routesV1.enrollmentManagement.findEnrollmentForStudent)
  findEnrollmentForStudent(@Body() body: { id: string }) {
    console.log('body', body);
    return this.enrollmentManagementService.findEnrollmentForStudent(body.id);
  }
}
