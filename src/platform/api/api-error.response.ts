import { ApiProperty } from '@nestjs/swagger';
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray';

export class ApiErrorResponse {
  @ApiProperty({ example: 400 })
  readonly httpStatus: number;

  // @ApiProperty({ example: 'Validation Error' })
  // readonly message: string;

  // @ApiProperty({ example: 'Bad Request' })
  // readonly error: string;

  // @ApiProperty({ example: 'YevPQs' })
  // readonly correlationId: string;

  @ApiProperty({
    description: 'Non-empty list of errors',
    nullable: false,
    required: true,
    isArray: true,
    type: () => ApiError,
  })
  readonly errors: NonEmptyArray<ApiError>;

  constructor(body: ApiErrorResponse) {
    this.httpStatus = body.httpStatus;
    // this.message = body.message;
    // this.error = body.error;
    // this.correlationId = body.correlationId;
    this.errors = body.errors;
  }
}

export class ApiError {
  @ApiProperty({ example: 'GENERIC.OUT_OF_RANGE' })
  readonly message: string;

  @ApiProperty({ example: 'El valor de tasación no puede ser menos que 0' })
  readonly code: string;

  @ApiProperty({ type: Object })
  readonly metadata: unknown;

  constructor(body: ApiError) {
    this.message = body.message;
    this.code = body.code;
    this.metadata = body.metadata ?? {};
  }
}
