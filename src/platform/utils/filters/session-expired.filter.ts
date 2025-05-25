import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common';
import { ApiError } from '@src/platform/api/api-error.response';
import { ExceptionBase } from '@src/platform/exceptions';
import { Response } from 'express';

@Catch(ExceptionBase)
export class ExceptionBaseFilter implements ExceptionFilter {
  catch(exception: ExceptionBase, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // TODO: Add dynamic status support
    const status = HttpStatus.EXPECTATION_FAILED;

    response.status(status).json({
      httpStatus: status,
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
