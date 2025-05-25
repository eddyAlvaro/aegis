import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsOptional } from 'class-validator';
import { RoleStatus } from '@src/modules/role-configuration/domain/types/role-status';

export class CreateRoleRequestDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsDefined()
  name: string;

  @ApiProperty({
    type: String,
    required: true,
  })
  @IsDefined()
  description: string;

  @ApiProperty({
    required: true,
    enum: RoleStatus,
  })
  @IsDefined()
  status: RoleStatus;

  @ApiProperty({})
  @IsOptional()
  organizationId: RoleStatus;

  @ApiProperty({
    required: true,
    isArray: true,
    type: () => String,
  })
  @IsDefined()
  grantIds: string[];
}
