import { ApiProperty } from '@nestjs/swagger';
import { PaginatedResponseDto } from '../../../../../platform/api/paginated.response.base';
import { SimpleRoleResponseDto } from './simple-role.response.dto';

export class FindRolesResponseDto extends PaginatedResponseDto<SimpleRoleResponseDto> {
  @ApiProperty({ type: () => SimpleRoleResponseDto, isArray: true })
  readonly data: readonly SimpleRoleResponseDto[];
}
