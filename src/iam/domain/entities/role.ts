import { ApiProperty } from '@nestjs/swagger';
import { Grant } from './grant';
import { NullableType } from '../../../platform/utils/types/nullable.type';

export class Role {
  constructor() {}
  @ApiProperty({
    type: String,
  })
  id: string;

  @ApiProperty({
    type: String,
  })
  name: string;

  isSystem: boolean;

  @ApiProperty({
    type: Array,
  })
  grants: Grant[];

  @ApiProperty()
  createdAt: NullableType<Date>;

  @ApiProperty()
  updatedAt: NullableType<Date>;
}
