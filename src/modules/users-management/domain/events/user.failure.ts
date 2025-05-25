import { ExceptionBase } from '../../../../platform/exceptions';

export class UserHasNoPasswordError extends ExceptionBase {
  static readonly message = 'El usuario no tiene un password establecido';

  public readonly code = 'USER.HAS_NO_PASSWORD';

  constructor(cause?: Error, metadata?: unknown) {
    super(UserHasNoPasswordError.message, cause, metadata);
  }
}
