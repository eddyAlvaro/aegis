import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { routesV1 } from '../../../config/app-routes';
import { CreateDrivingEvaluationDto } from '../application/dtos/create-driving-evaluation.dto';
import { EvaluationManagementService } from '../application/services/evaluation-management.service';
import { CreateTeoricEvaluationDto } from '../application/dtos/create-teoric-evaluation.dto';

@ApiTags(routesV1.driving.root)
@Controller(routesV1.version)
export class EvaluationManagementHttpController {
  constructor(
    private readonly evaluationManagementService: EvaluationManagementService,
  ) {}

  @ApiOperation({ summary: 'Resultado examenes de práctica' })
  @Post(routesV1.driving.evaluation.driving)
  createDrivingEvaluation(@Body() bodyParams: CreateDrivingEvaluationDto) {
    return this.evaluationManagementService.createDrivingEvaluation(bodyParams);
  }

  @ApiOperation({ summary: 'Resultado examenes de práctica' })
  @Get(routesV1.driving.evaluation.drivingResult)
  findDrivingEvaluationByParticipant(@Query() query: { id: string }) {
    return this.evaluationManagementService.findDrivingEvaluationByParticipant(
      query.id,
    );
  }

  @ApiOperation({ summary: 'Resultado examenes de teoría' })
  @Post(routesV1.driving.evaluation.teoric)
  createTeoricEvaluation(@Body() bodyParams: CreateTeoricEvaluationDto) {
    return this.evaluationManagementService.createTeoricEvaluation(bodyParams);
  }

  @ApiOperation({ summary: 'Resultado examenes de teoría' })
  @Get(routesV1.driving.evaluation.teoricResult)
  findTeoricEvaluationByParticipant(@Query() query: { enrollmentId: string }) {
    return this.evaluationManagementService.findTeoricEvaluationByParticipant(
      query.enrollmentId,
    );
  }
}
