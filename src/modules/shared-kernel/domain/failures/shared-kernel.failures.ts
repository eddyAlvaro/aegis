import { ExceptionBase } from '@src/platform/exceptions';

export class UserNotAuthorized extends ExceptionBase {
  static readonly message =
    'El usuario no tiene los privilegios para ejecutar este servicio';

  public readonly code = 'SHARED_KERNEL.NOT_AUTHORIZED';

  constructor(cause?: Error, metadata?: unknown) {
    super(UserNotAuthorized.message, cause, metadata);
  }
}

export class SimpleDomainFailure extends ExceptionBase {
  public readonly code = 'SHARED_KERNEL.STANDARD_ERROR';

  constructor(message: string, cause?: Error, metadata?: unknown) {
    super(message, cause, metadata);
  }
}

export class UserSuspended extends ExceptionBase {
  static readonly message =
    'Tu cuenta se encuentra suspendida, comuniquese con su supervisor, o comuniquese con soporte@deocasion.com';

  public readonly code = 'SHARED_KERNEL.USER_SUSPENDED';

  constructor(cause?: Error, metadata?: unknown) {
    super(UserNotAuthorized.message, cause, metadata);
  }
}

export class SessionExpired extends ExceptionBase {
  static readonly message = 'La sesión ha expirado, por favor inicia de nuevo';

  public readonly code = 'SHARED_KERNEL.SESSION_EXPIRED';

  constructor(cause?: Error, metadata?: unknown) {
    super(SessionExpired.message, cause, metadata);
  }
}
