import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { routesV1 } from '../../../config/app-routes';
import {
  Body,
  Controller,
  Get,
  Logger,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { DrivingManagementService } from '../application/services/driving-management.service';
import { randomUUID } from 'crypto';
import { CourseDto } from '../application/dtos/course-dto';
import { LicenseCategoryEntity } from '../infraestructure/persistence/relational/entity/training/license-category.entity';
import { LicenceCategoryDto } from '../application/dtos/licence-category-dto';
import { CreateDrivingTeoricRecordDto } from '../application/dtos/create-driving-teoric-record.dto';
import { UpdateCoursesForLicenseCategoryDto } from '../application/dtos/update-licence-category.dto';
import { CustomAuthGuard } from '../../shared-kernel/application/guards/custom-jwt-auth.guard';
import { AuthorizationGuard } from '../../shared-kernel/application/guards/authorization.guard';
import { Grants } from '../../shared-kernel/application/decorators/permissions';
import { GrantId } from '../../role-configuration/domain/types/grants';

@ApiTags(routesV1.driving.root)
@Controller(routesV1.version)
@UseGuards(CustomAuthGuard, AuthorizationGuard)
export class DrivingManagementHttpController {
  private readonly logger = new Logger(DrivingManagementHttpController.name);
  constructor(
    private readonly drivingManagementService: DrivingManagementService,
  ) {}

  @ApiOperation({ summary: 'Crear registro de entrenamiento' })
  @Post(routesV1.driving.generateDrivingTrainingRecord)
  @Grants(GrantId.PlatformUsersCanViewParticipants)
  createDrivingTrainingRecord(@Body() bodyParams: any): Promise<any> {
    return this.drivingManagementService.createDrivingTrainingRecord(
      bodyParams,
    );
  }
  @ApiOperation({ summary: 'Crear curso' })
  @Post(routesV1.driving.courses)
  @Grants(GrantId.PlatformUsersCanViewParticipants)
  createCourse(@Body() bodyParams: Omit<CourseDto, 'id'>): Promise<void> {
    console.log('bodyParams', bodyParams);
    return this.drivingManagementService.createCourse(bodyParams);
  }

  @ApiOperation({ summary: 'Obtener cursos' })
  @Get(routesV1.driving.courses)
  @Grants(GrantId.PlatformUsersCanViewParticipants)
  findCourses(): Promise<any> {
    return this.drivingManagementService.findCourses();
  }

  @ApiOperation({ summary: 'Crear licencia' })
  @Post(routesV1.driving.licenceCategory)
  @Grants(GrantId.PlatformUsersCanViewParticipants)
  createLicenseCategory(
    @Body() bodyParams: Omit<LicenceCategoryDto, 'id'>,
  ): Promise<void> {
    console.log('bodyParams', bodyParams);
    return this.drivingManagementService.createLicenseCategory(bodyParams);
  }
  @ApiOperation({ summary: 'Crear licencia' })
  @Post(routesV1.driving.updateLicenceCategory)
  @Grants(GrantId.PlatformUsersCanViewParticipants)
  updateCoursesForLicenseCategory(
    @Body() bodyParams: UpdateCoursesForLicenseCategoryDto,
  ): Promise<void> {
    return this.drivingManagementService.updateCoursesForLicenseCategory(
      bodyParams,
    );
  }

  @ApiOperation({ summary: 'Crear licencia' })
  @Get(routesV1.driving.licenceCategory)
  @Grants(GrantId.PlatformUsersCanViewParticipants)
  findLicenseCategory(): Promise<LicenseCategoryEntity[]> {
    return this.drivingManagementService.findLicenseCategory();
  }

  @ApiOperation({ summary: 'Crear registro de teorica' })
  @Post(routesV1.driving.generateDrivingTeoricRecord)
  @Grants(GrantId.PlatformUsersCanViewParticipants)
  createDrivingTeoricRecord(
    @Body() bodyParams: CreateDrivingTeoricRecordDto,
  ): Promise<any> {
    console.log('bodyParams', bodyParams);
    return this.drivingManagementService.createDrivingTeoricRecord(bodyParams);
  }

  @ApiOperation({ summary: 'Obtener registros teoricos por participante' })
  @Get(routesV1.driving.findDrivingTeoricRecordByParticipant)
  @Grants(GrantId.PlatformUsersCanViewParticipants)
  findDrivingTeoricRecordByParticipant(@Query() query: { id: string }) {
    return this.drivingManagementService.findDrivingTeoricRecordByParticipant(
      query.id,
    );
  }

  @ApiOperation({ summary: 'Obtener registros prácticos por participante' })
  @Get(routesV1.driving.findDrivingTrainingRecordByParticipant)
  @Grants(GrantId.PlatformUsersCanViewParticipants)
  findDrivingTrainingRecordByParticipant(@Query() query: { id: string }) {
    return this.drivingManagementService.findDrivingTrainingRecordByParticipant(
      query.id,
    );
  }
}
