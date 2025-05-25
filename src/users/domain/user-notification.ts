import { ApiResponseProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { IsBoolean, IsDate } from 'class-validator';

export class UserNotification {
  @ApiResponseProperty({
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  id: string;

  @ApiResponseProperty({
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Expose()
  user: string;

  @ApiResponseProperty({
    type: String,
    example: '123e4567-e89b-12d3-a456-426614174000',
  })
  @Expose()
  notification: string;

  @ApiResponseProperty({
    type: Boolean,
    example: false,
  })
  @Expose()
  @IsBoolean()
  isRead: boolean;

  @ApiResponseProperty({
    type: Date,
    example: '2024-07-15T00:00:00.000Z',
  })
  @Expose()
  @IsDate()
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  createdAt: Date;
}
