import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';

export class IdRequestDto {
  constructor(id: string) {
    this.id = id;
  }

  @ApiProperty({
    example: '2cdc8ab1-6d50-49cc-ba14-54e4ac7ec23',
    description: 'An Id',
  })
  @IsDefined()
  readonly id: string;
}
