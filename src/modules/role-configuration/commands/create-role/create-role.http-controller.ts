import {
  Body,
  Controller,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiErrorResponse } from '@platform/api/api-error.response';
import { IdResponse } from '@platform/api/id.response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { randomUUID } from 'crypto';
import {
  RoleEntity,
  GlobalType as GlobalType,
} from '@src/iam/infrastructure/persistence/relational/entities/role.entity';
import { CreateRoleRequestDto } from './dto/create-role.request.dto';
import { GrantId, grantMap } from '../../domain/types/grants';
import {
  GrantNotFound,
  RoleNameExists,
} from '../../domain/failures/role.failures';
import { CustomAuthGuard } from '@src/modules/shared-kernel/application/guards/custom-jwt-auth.guard';
import { AuthorizationGuard } from '@src/modules/shared-kernel/application/guards/authorization.guard';
import { Grants } from '@src/modules/shared-kernel/application/decorators/permissions';
import { routesV1 } from '../../../../config/app-routes';

@ApiTags(routesV1.roleConfiguration.root)
@Controller(routesV1.version)
@UseGuards(CustomAuthGuard, AuthorizationGuard)
export class CreateRoleHttpController {
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
  @Post(routesV1.roleConfiguration.createRole)
  // @Grants(GrantId.PlatformRolesCanCreate, GrantId.OrganizationRolesCanCreate)
  async create(
    @Body() body: CreateRoleRequestDto,
    @Request() request: any,
  ): Promise<IdResponse> {
    const entryGrants = body.grantIds;
    if (entryGrants.some((e) => grantMap[e] === null)) {
      throw new GrantNotFound();
    } else {
      const whereConditional = {
        name: body.name,
      };
      if (body.organizationId) {
        whereConditional['organizations'] = {
          id: body.organizationId,
        };
      }
      const count = await this.typeormRoleRepository.count({
        where: whereConditional,
        relations: ['organizations'],
      });
      if (count > 0) {
        throw new RoleNameExists();
      }
      const created = await this.typeormRoleRepository.save(
        this.typeormRoleRepository.create({
          id: randomUUID(),
          name: body.name,
          status: body.status,
          type:
            request.type === 'organization'
              ? GlobalType.Organization
              : GlobalType.Platform,
          isSystem: false,
          grantIds: body.grantIds as GrantId[],
          description: body.description,
        }),
      );
      return { id: created.id };
    }
  }
}
