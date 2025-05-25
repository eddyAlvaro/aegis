import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';

export class DeleteRoleRequestDto {
  @ApiProperty({ example: 'aadsj-asd-asd-122cd' })
  @IsDefined()
  readonly id: string;
}
