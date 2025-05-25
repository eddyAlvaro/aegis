import { ExceptionBase } from '../../../platform/exceptions';

export class EmailUserNotFound extends ExceptionBase {
  static readonly message = 'El correo electrónico no existe';

  public readonly code = 'AUTH.EMAIL_USER_NOT_FOUND';

  constructor(cause?: Error, metadata?: unknown) {
    super(EmailUserNotFound.message, cause, metadata);
  }
}

export class EmailAlreadyUsed extends ExceptionBase {
  static readonly message = 'El correo electrónico ya esta en uso';

  public readonly code = 'AUTH.EMAIL_ALREADY_USED';

  constructor(cause?: Error, metadata?: unknown) {
    super(EmailAlreadyUsed.message, cause, metadata);
  }
}

export class AccountValidationPending extends ExceptionBase {
  static readonly message = 'La cuenta aun no ha sido verificada';

  public readonly code = 'AUTH.VALIDATION_PENDING';

  constructor(cause?: Error, metadata?: unknown) {
    super(EmailAlreadyUsed.message, cause, metadata);
  }
}

export class IncorrectPassword extends ExceptionBase {
  static readonly message = 'La contraseña es incorrecta';

  public readonly code = 'AUTH.INCORRECT_PASSWORD';

  constructor(cause?: Error, metadata?: unknown) {
    super(EmailUserNotFound.message, cause, metadata);
  }
}
