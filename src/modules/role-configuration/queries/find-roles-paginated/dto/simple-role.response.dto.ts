import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { RoleStatus } from '@src/modules/role-configuration/domain/types/role-status';

export class SimpleRoleResponseDto {
  @ApiProperty({ example: '2020-11-24T17:43:15.970Z' })
  readonly createdAt: string;

  @ApiProperty({ example: '2020-11-24T17:43:15.970Z' })
  readonly updatedAt: string;

  @ApiProperty()
  readonly usersCount: number;

  @ApiProperty()
  readonly id: string;
  constructor(props: SimpleRoleResponseDto) {
    this.id = props.id;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.name = props.name;
    this.description = props.description;
    this.isSystem = props.isSystem;
    this.status = props.status;
    this.usersCount = props.usersCount;
  }
  @ApiProperty({
    example: 'joh-doe@gmail.com',
  })
  name: string;

  @ApiProperty({
    example: 'a description',
  })
  description: string;

  @ApiResponseProperty({
    type: () => Boolean,
  })
  isSystem: boolean;

  @ApiProperty({
    enum: RoleStatus,
  })
  status: RoleStatus;
}
