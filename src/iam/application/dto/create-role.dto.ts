// Don't forget to use the class-validator decorators in the DTO properties.
// import { Allow } from 'class-validator';
import { IsArray, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { RoleGrantDto } from './role-grant.dto';
import { trimTransformer } from '../../../platform/utils/transformers/trim.transformer';

export class CreateRoleDto {
  @ApiProperty({ example: 'it-recruiter', type: String })
  @Transform(trimTransformer)
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: Array })
  @IsArray()
  grants: RoleGrantDto[];

  @IsNumber({ allowInfinity: false, allowNaN: false })
  @IsNotEmpty()
  @ApiProperty({ example: 1 })
  priority: number;
}
