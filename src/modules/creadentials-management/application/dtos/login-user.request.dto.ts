import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';

export class LoginUserRequestDto {
  @ApiProperty({ example: 'superadmin@deocasion.com' })
  @IsDefined()
  readonly email: string;

  @ApiProperty({ example: 'superadmin' })
  @IsDefined()
  readonly password: string;
}
