import { ExceptionBase } from '@src/platform/exceptions';

export class GrantNotFound extends ExceptionBase {
  static readonly message = 'La funcion que quieres aplicar no existe';

  public readonly code = 'AUTH.GRANT_NOT_FOUND';

  constructor(cause?: Error, metadata?: unknown) {
    super(GrantNotFound.message, cause, metadata);
  }
}

export class RoleNameExists extends ExceptionBase {
  static readonly message = 'Ya existe un rol con ese nombre';

  public readonly code = 'AUTH.NAME_ALREADY_EXISTS';

  constructor(cause?: Error, metadata?: unknown) {
    super(RoleNameExists.message, cause, metadata);
  }
}

export class CannotDeleteSystemRole extends ExceptionBase {
  static readonly message =
    'No se puede eliminar este rol porque es un rol de sistema';

  public readonly code = 'ROLE_MANAGEMENT.CANNOT_DELETE_SYSTEM_ROLE';

  constructor(cause?: Error, metadata?: unknown) {
    super(CannotDeleteSystemRole.message, cause, metadata);
  }
}
