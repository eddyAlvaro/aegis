import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { routesV1 } from '../../../config/app-routes';
import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { DrivingManagementService } from '../application/services/driving-management.service';
import { randomUUID } from 'crypto';

@ApiTags(routesV1.driving.root)
@Controller(routesV1.version)
export class DrivingManagementHttpController {
  private readonly logger = new Logger(DrivingManagementHttpController.name);
  constructor(
    private readonly drivingManagementService: DrivingManagementService,
  ) {}

  @ApiOperation({ summary: 'Crear comentario' })
  @Post(routesV1.driving.generateDrivingTrainingRecord)
  createComment(@Body() bodyParams): Promise<any> {
    return this.drivingManagementService.createDrivingTrainingRecord(
      bodyParams,
    );
  }
}
