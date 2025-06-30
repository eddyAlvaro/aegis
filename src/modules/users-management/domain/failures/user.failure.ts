import { ExceptionBase } from '@src/platform/exceptions';

export class UserNotFoundFailure extends ExceptionBase {
  static readonly message = 'No se encontro el usuario';

  public readonly code = 'USER.NOT_FOUND';

  constructor(cause?: Error, metadata?: unknown) {
    super(UserNotFoundFailure.message, cause, metadata);
  }
}
