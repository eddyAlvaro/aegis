import {
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { routesV1 } from '../../../../config/app-routes';
import { Controller, Get, HttpStatus, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from '../../../../iam/infrastructure/persistence/relational/entities/role.entity';
import { Repository } from 'typeorm';
import { ApiErrorResponse } from '../../../../platform/api/api-error.response';
import { SimpleRoleResponseDto } from '../find-roles-paginated/dto/simple-role.response.dto';
import { IsString } from 'class-validator';

export class GetRoleDetailParams {
  @ApiProperty({
    example: '12344523456',
    required: true,
  })
  @IsString()
  readonly id: string;
}

@ApiTags(routesV1.roleConfiguration.root)
@Controller(routesV1.version)
export class GetRoleDetailHttpController {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly typeormRoleRepository: Repository<RoleEntity>,
  ) {}

  @ApiOperation({
    summary: 'Get Role detail',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SimpleRoleResponseDto,
    isArray: true,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    type: ApiErrorResponse,
  })
  @Get(routesV1.roleConfiguration.getRoleDetail)
  async create(@Query() queryParams: GetRoleDetailParams): Promise<any> {
    const role = await this.typeormRoleRepository.findOne({
      where: { id: queryParams.id },
    });

    console.log(`role ${JSON.stringify(role)}`);

    return role;
    //grants: role?.grants.map((e) => ({ id: e, name: `Function ${e}` })),
    //   grants: role?.grants.map((e) => ({
    //     id: e,
    //     name: platformGrantMap[e]?.name || organizationGrantMap[e]?.name,
    //   })),
    // };
  }
}
