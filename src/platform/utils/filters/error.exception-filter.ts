import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ApiError } from '@src/platform/api/api-error.response';
import { Response } from 'express';

@Catch()
export class GlobalErrorFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalErrorFilter.name);
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    this.logger.error(exception.message, exception.stack);

    // TODO: Add dynamic status support
    const status = HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      httpStatus: status,
      errors: [
        new ApiError({
          code: 'SHARED_KERNEL.UNKNOWN',
          message: `Ocurrio un error desconocido`,
          metadata: {
            stackTrace: exception.stack,
          },
        }),
      ],
    });
  }
}
