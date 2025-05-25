import { IsDefined, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { BatchOperationType } from '@src/platform/utils/batch/operation-type';

export class BatchRequestDto {
  @ApiProperty({ enum: BatchOperationType })
  @IsDefined()
  readonly type: BatchOperationType;

  @ApiProperty({
    type: () => String,
    isArray: true,
  })
  @IsDefined()
  readonly ids: string[];

  @ApiProperty({
    type: () => String,
    isArray: true,
  })
  @IsDefined()
  readonly eventId: string;

  @ApiProperty({
    type: () => Boolean,
    isArray: false,
  })
  @IsOptional()
  readonly onlyWinners: boolean;
}
