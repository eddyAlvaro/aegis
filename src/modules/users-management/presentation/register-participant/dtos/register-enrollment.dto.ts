import { ApiProperty } from '@nestjs/swagger';
import { IsDefined } from 'class-validator';

export class RegisterEnrollmentDto {
  @ApiProperty()
  @IsDefined()
  readonly firstName: string;

  @ApiProperty()
  @IsDefined()
  readonly lastName: string;

  @ApiProperty()
  @IsDefined()
  readonly birthDate: Date;

  @ApiProperty()
  @IsDefined()
  readonly documentIdentifier: string;

  @ApiProperty()
  @IsDefined()
  readonly currentLicense: 'A-I' | 'A-IIb';

  @ApiProperty({ description: 'License the participant aspires to obtain' })
  @IsDefined()
  readonly desiredLicense: 'A-I' | 'A-IIb';

  @ApiProperty({ description: 'Type of process or request' })
  @IsDefined()
  readonly procedureType: 'RECATEGOROZACION' | 'TRANSFERENCIA';

  @ApiProperty()
  @IsDefined()
  readonly classStartDate: Date;

  @ApiProperty()
  @IsDefined()
  readonly classEndDate: Date;

  @ApiProperty({ description: 'Class schedule (e.g., 8:00am - 12:00pm)' })
  @IsDefined()
  readonly schedule: string;

  @ApiProperty({ description: 'Days of the week (e.g., Monday to Friday)' })
  @IsDefined()
  readonly days: string;

  @ApiProperty({ description: 'Shift (e.g., morning, afternoon, evening)' })
  @IsDefined()
  readonly shift: string;

  @ApiProperty({ description: 'Date of document issuance' })
  @IsDefined()
  readonly issueDate: string;

  @ApiProperty({ description: 'Course name' })
  @IsDefined()
  readonly course: 'COURSE_1' | 'COURSE_2' | 'COURSE_3';

  @ApiProperty()
  @IsDefined()
  readonly phoneNumber: string;

  @ApiProperty({ example: 'superadmin@deocasion.com' })
  @IsDefined()
  readonly email: string;

  @ApiProperty({ description: 'Current occupation or job title' })
  @IsDefined()
  readonly occupation: string;
}
