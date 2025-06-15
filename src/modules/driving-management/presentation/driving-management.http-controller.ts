import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { routesV1 } from '../../../config/app-routes';
import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';
import { DrivingManagementService } from '../application/services/driving-management.service';
import { randomUUID } from 'crypto';
import { CourseDto } from '../application/dtos/course-dto';
import { LicenseCategoryEntity } from '../infraestructure/persistence/relational/entity/training/license-category.entity';
import { LicenceCategoryDto } from '../application/dtos/licence-category-dto';
import { CreateDrivingTeoricRecordDto } from '../application/dtos/create-driving-teoric-record.dto';
import { UpdateCoursesForLicenseCategoryDto } from '../application/dtos/update-licence-category.dto';

@ApiTags(routesV1.driving.root)
@Controller(routesV1.version)
export class DrivingManagementHttpController {
  private readonly logger = new Logger(DrivingManagementHttpController.name);
  constructor(
    private readonly drivingManagementService: DrivingManagementService,
  ) {}

  @ApiOperation({ summary: 'Crear registro de entrenamiento' })
  @Post(routesV1.driving.generateDrivingTrainingRecord)
  createDrivingTrainingRecord(@Body() bodyParams: any): Promise<any> {
    return this.drivingManagementService.createDrivingTrainingRecord(
      bodyParams,
    );
  }
  @ApiOperation({ summary: 'Crear curso' })
  @Post(routesV1.driving.courses)
  createCourse(@Body() bodyParams: Omit<CourseDto, 'id'>): Promise<void> {
    console.log('bodyParams', bodyParams);
    return this.drivingManagementService.createCourse(bodyParams);
  }

  @ApiOperation({ summary: 'Obtener cursos' })
  @Get(routesV1.driving.courses)
  findCourses(): Promise<any> {
    return this.drivingManagementService.findCourses();
  }

  @ApiOperation({ summary: 'Crear licencia' })
  @Post(routesV1.driving.licenceCategory)
  createLicenseCategory(
    @Body() bodyParams: Omit<LicenceCategoryDto, 'id'>,
  ): Promise<void> {
    console.log('bodyParams', bodyParams);
    return this.drivingManagementService.createLicenseCategory(bodyParams);
  }
  @ApiOperation({ summary: 'Crear licencia' })
  @Post(routesV1.driving.updateLicenceCategory)
  updateCoursesForLicenseCategory(
    @Body() bodyParams: UpdateCoursesForLicenseCategoryDto,
  ): Promise<void> {
    return this.drivingManagementService.updateCoursesForLicenseCategory(
      bodyParams,
    );
  }

  @ApiOperation({ summary: 'Crear licencia' })
  @Get(routesV1.driving.licenceCategory)
  findLicenseCategory(): Promise<LicenseCategoryEntity[]> {
    return this.drivingManagementService.findLicenseCategory();
  }

  @ApiOperation({ summary: 'Crear registro de teorica' })
  @Post(routesV1.driving.generateDrivingTeoricRecord)
  createDrivingTeoricRecord(
    @Body() bodyParams: CreateDrivingTeoricRecordDto,
  ): Promise<any> {
    console.log('bodyParams', bodyParams);
    return this.drivingManagementService.createDrivingTeoricRecord(bodyParams);
  }

  @ApiOperation({ summary: 'Obtener registros teoricos por participante' })
  @Get(routesV1.driving.findDrivingTrainingRecordByParticipant)
  findDrivingTrainingRecordByParticipant(@Query() query: { id: string }) {
    return this.drivingManagementService.findDrivingTeoricRecordByParticipant(
      query.id,
    );
  }
}
