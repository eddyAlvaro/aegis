import { ExceptionBase } from '../../../../platform/exceptions';

export class UserAlreadyExistsByDocument extends ExceptionBase {
  static readonly message =
    'Ya existe otro usuario con este número de documento';

  public readonly code = 'REGISTER.USER_ALREADY_EXISTS';

  constructor(cause?: Error, metadata?: unknown) {
    super(UserAlreadyExistsByDocument.message, cause, metadata);
  }
}

export class UserAlreadyExistsByPhoneNumber extends ExceptionBase {
  static readonly message = 'El número de teléfono ya existe';

  public readonly code = 'REGISTER.USER_ALREADY_EXISTS_BY_PHONE_NUMBER';

  constructor(cause?: Error, metadata?: unknown) {
    super(UserAlreadyExistsByPhoneNumber.message, cause, metadata);
  }
}
export class UserAlreadyExistsByRuc extends ExceptionBase {
  static readonly message = 'El RUC ya existe';

  public readonly code = 'REGISTER.USER_ALREADY_EXISTS_BY_RUC';

  constructor(cause?: Error, metadata?: unknown) {
    super(UserAlreadyExistsByRuc.message, cause, metadata);
  }
}
