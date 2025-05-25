import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { UserNotAuthorized } from '@src/modules/shared-kernel/domain/failures/shared-kernel.failures';
import { ApiError } from '@src/platform/api/api-error.response';
import { Response } from 'express';

@Catch(UserNotAuthorized)
export class UserNotAuthorizedFilter implements ExceptionFilter {
  catch(exception: UserNotAuthorized, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = HttpStatus.FORBIDDEN;

    response.status(status).json({
      httpStatus: HttpStatus.FORBIDDEN,
      errors: [
        new ApiError({
          code: exception.code,
          message: exception.message,
          metadata: exception.metadata,
        }),
      ],
    });
  }
}
