import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ExceptionBase, INTERNAL_SERVER_ERROR } from '../../exceptions';
import { ApiError, ApiErrorResponse } from '../../api/api-error.response';
import { ZodError } from 'zod';
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray';
import { TokenExpiredError } from '@nestjs/jwt';
import { SessionExpired } from '@src/modules/shared-kernel/domain/failures/shared-kernel.failures';

export class ExceptionInterceptor implements NestInterceptor {
  private readonly logger: Logger = new Logger(ExceptionInterceptor.name);

  intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<ExceptionBase> {
    return next.handle().pipe(
      catchError((err) => {
        // Logging for debugging purposes
        console.log(`Se ejecuto el interceptor ${err.constructor.name}`);
        if (err instanceof ExceptionBase) {
          err = new BadRequestException(
            new ApiErrorResponse({
              httpStatus: HttpStatus.EXPECTATION_FAILED,
              errors: [
                new ApiError({
                  code: err.code,
                  message: err.message,
                  metadata: err.metadata,
                }),
              ],
            }),
          );
          return throwError(() => err);
        }

        if (err instanceof BadRequestException) {
          return throwError(() => err);
        }

        if (err instanceof TokenExpiredError) {
          const sessionExpired = new SessionExpired();
          err = new BadRequestException(
            new ApiErrorResponse({
              httpStatus: HttpStatus.UNAUTHORIZED,
              errors: [
                new ApiError({
                  code: sessionExpired.code,
                  message: sessionExpired.message,
                  metadata: sessionExpired.metadata,
                }),
              ],
            }),
          );
          return throwError(() => err);
        }

        if (err instanceof ZodError) {
          const zodErrors = err.errors;
          err = new BadRequestException(
            new ApiErrorResponse({
              httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
              errors: zodErrors.map(
                (error) =>
                  new ApiError({
                    code: `VALIDATION.${error.code.toUpperCase()}`,
                    message: error.message,
                    metadata: {
                      path: error.path,
                      fatal: error.fatal,
                    },
                  }),
              ) as NonEmptyArray<ApiError>,
            }),
          );
          return throwError(() => err);
        }

        const stackTrace = err.stack;
        this.logger.error(err.message, stackTrace);

        err = new BadRequestException(
          new ApiErrorResponse({
            httpStatus: HttpStatus.INTERNAL_SERVER_ERROR,
            errors: [
              new ApiError({
                code: INTERNAL_SERVER_ERROR,
                message: 'Ocurrio un error del lado servidor',
                metadata: {
                  stackTrace: stackTrace,
                },
              }),
            ],
          }),
        );
        return throwError(() => err);
      }),
    );
  }
}
