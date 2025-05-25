import { Body, Controller, HttpStatus, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiErrorResponse } from '@platform/api/api-error.response';
import { IdResponse } from '@platform/api/id.response.dto';
import { routesV1 } from '../../../../config/app-routes';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from '@src/iam/infrastructure/persistence/relational/entities/role.entity';
import { CreateRoleRequestDto as UpdateRoleRequestDto } from './dto/create-role.request.dto';
import { GrantNotFound } from '../../domain/failures/role.failures';
import { GrantId, grantMap } from '../../domain/types/grants';

@ApiTags(routesV1.roleConfiguration.root)
@Controller(routesV1.version)
export class UpdateRoleHttpController {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly typeormRoleRepository: Repository<RoleEntity>,
  ) {}

  @ApiOperation({ summary: 'Create a role' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: IdResponse,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  @Put(routesV1.roleConfiguration.updateRole)
  async create(@Body() body: UpdateRoleRequestDto): Promise<IdResponse> {
    const grantIds = body.grantIds;
    if (grantIds.some((grantId) => grantMap[grantId] === null)) {
      throw new GrantNotFound();
    } else {
      const created = await this.typeormRoleRepository.save(
        this.typeormRoleRepository.create({
          id: body.id,
          name: body.name,
          status: body.status,
          isSystem: false,
          grantIds: body.grantIds as GrantId[],
          description: body.description,
        }),
      );
      return { id: created.id };
    }
  }
}
