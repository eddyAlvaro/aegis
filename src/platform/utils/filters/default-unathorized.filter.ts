import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UserNotAuthorized } from '@src/modules/shared-kernel/domain/failures/shared-kernel.failures';
import { ApiError } from '@src/platform/api/api-error.response';
import { Request, Response } from 'express';

@Catch(UnauthorizedException)
export class UnauthorizedExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception.getStatus();
    const customException = new UserNotAuthorized();

    response.status(status).json({
      httpStatus: HttpStatus.UNAUTHORIZED,
      errors: [
        new ApiError({
          code: customException.code,
          message: customException.message,
          metadata: customException.metadata,
        }),
      ],
    });
  }
}
