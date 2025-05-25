import {
  BadRequestException,
  HttpStatus,
  ValidationError,
  ValidationPipeOptions,
} from '@nestjs/common';
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray';
import { ApiError, ApiErrorResponse } from '../api/api-error.response';

function generateErrors(errors: ValidationError[]) {
  return errors.reduce(
    (accumulator, currentValue) => ({
      ...accumulator,
      [currentValue.property]:
        (currentValue.children?.length ?? 0) > 0
          ? generateErrors(currentValue.children ?? [])
          : Object.values(currentValue.constraints ?? {}).join(', '),
    }),
    {},
  );
}

const validationOptions: ValidationPipeOptions = {
  transform: true,
  whitelist: true,

  errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
  exceptionFactory: (errors: ValidationError[]) => {
    // return new UnprocessableEntityException({
    //   status: HttpStatus.UNPROCESSABLE_ENTITY,
    //   errors: generateErrors(errors),
    // });

    const errorsMap = generateErrors(errors);
    const errorsMapKeys = Object.keys(errorsMap) as NonEmptyArray<string>;
    const apiErrors = errorsMapKeys.map(
      (key) =>
        new ApiError({
          code: key,
          message: errorsMap[key],
          metadata: {},
        }),
    ) as NonEmptyArray<ApiError>;

    const errorApiResponse = new ApiErrorResponse({
      httpStatus: HttpStatus.UNPROCESSABLE_ENTITY,
      errors: apiErrors,
    });
    return new BadRequestException(errorApiResponse);
  },
};

export default validationOptions;
