import { ExceptionBase } from '../../../../platform/exceptions';

export class IncorrectCredentialsFailure extends ExceptionBase {
  static readonly message = 'Las credenciles son invalidas';

  public readonly code = 'AUTH.INVALID_CREDENTIALS';

  constructor(cause?: Error, metadata?: unknown) {
    super(IncorrectCredentialsFailure.message, cause, metadata);
  }
}

export class MaxAttemptsLimitExceed extends ExceptionBase {
  static readonly message =
    'Se alcance el limite de intentos, se reestablecera su contraseña, revisa tu bandeja de entrada';

  public readonly code = 'AUTH.MAX_ATTEMPTS_LIMIT_EXCEED';

  constructor(cause?: Error, metadata?: unknown) {
    super(MaxAttemptsLimitExceed.message, cause, metadata);
  }
}

export class CannotLoginBecauseUserIsSuspended extends ExceptionBase {
  static readonly message =
    'Usuario suspendido o bloqueado, no puede iniciar sesión';

  public readonly code = 'AUTH.USER_IS_SUSPENDED';

  constructor(cause?: Error, metadata?: unknown) {
    super(CannotLoginBecauseUserIsSuspended.message, cause, metadata);
  }
}

export class CannotLoginBecauseUserIsNotVerified extends ExceptionBase {
  static readonly message = 'Usuario sin verificar, no puede iniciar sesión';

  public readonly code = 'AUTH.USER_NOT_VERIFIED';

  constructor(metadata: { userId: string }, cause?: Error) {
    super(CannotLoginBecauseUserIsSuspended.message, cause, metadata);
  }
}

export class PasswordExpired extends ExceptionBase {
  static readonly message =
    'La contraseña ha expirado. Por favor, ingrese al siguiente enlace para reestablecerla.';

  public readonly code = 'AUTH.PASSWORD_EXPIRED';

  constructor(cause?: Error, metadata?: unknown) {
    super(EmailWasSend.message, cause, metadata);
  }
}

export class EmailWasSend extends ExceptionBase {
  static readonly message =
    'Ya se envió un enlace con los pasos para recuperar tu cuenta, por favor revisa tu bandeja de entrada o espera 24 horas para recibir un nuevo enlace.';

  public readonly code = 'AUTH.USER_EMAIL_WAS_SEND';

  constructor(cause?: Error, metadata?: unknown) {
    super(EmailWasSend.message, cause, metadata);
  }
}

export class IncorrectHashFailure extends ExceptionBase {
  static readonly message = 'El enlace es incorrecto o expiro';

  public readonly code = 'AUTH.INCORRECT_HASH';

  constructor(cause?: Error, metadata?: unknown) {
    super(IncorrectHashFailure.message, cause, metadata);
  }
}
