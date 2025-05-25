import { Resource } from '../../domain/entities/resource';
import { Possession } from '../../domain/entities/possession';
import { Operation } from '../../domain/entities/operation';
import { ApiProperty } from '@nestjs/swagger';

export class RoleGrantDto {
  @ApiProperty({
    enum: Resource,
  })
  resource: Resource;
  @ApiProperty({
    enum: Possession,
  })
  possession: Possession;
  @ApiProperty({
    enum: Operation,
  })
  operation: Operation;
  attributes: string[];
}
