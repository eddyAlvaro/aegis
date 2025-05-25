import { Exclude } from 'class-transformer';
import { FileType } from '../../files/domain/file';
import { ApiResponseProperty } from '@nestjs/swagger';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../iam/domain/entities/role';

export class User {
  @ApiResponseProperty({
    type: String,
    example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiResponseProperty({
    type: String,
    example: 'john.doe@example.com',
  })
  // @Expose({ groups: ['me', 'admin'] })
  email: string | null;

  @Exclude({ toPlainOnly: true })
  password?: string;

  @Exclude({ toPlainOnly: true })
  previousPassword?: string;

  @ApiResponseProperty({
    type: String,
    example: 'email',
  })
  // @Expose({ groups: ['me', 'admin'] })
  provider: string;

  @ApiResponseProperty({
    type: String,
    example: '1234567890',
  })
  // @Expose({ groups: ['me', 'admin'] })
  socialId?: string | null;

  @ApiResponseProperty({
    type: String,
    example: 'John',
  })
  firstName: string | null;

  @ApiResponseProperty({
    type: String,
    example: 'Doe',
  })
  lastName: string | null;

  @ApiResponseProperty({
    type: () => FileType,
  })
  photo?: FileType | null;

  @ApiResponseProperty({
    type: () => [Role],
  })
  roles: Role[];

  @ApiResponseProperty()
  createdAt: Date;

  @ApiResponseProperty()
  updatedAt: Date;

  @ApiResponseProperty()
  deletedAt: Date;
}
