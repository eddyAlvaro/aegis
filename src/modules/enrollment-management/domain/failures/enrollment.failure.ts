import { ExceptionBase } from '../../../../platform/exceptions';

export class LicenceNotFound extends ExceptionBase {
  static readonly message = 'Licencia no encontrada';

  public readonly code = 'LICENCE.NOT_FOUND';

  constructor(cause?: Error, metadata?: unknown) {
    super(LicenceNotFound.message, cause, metadata);
  }
}

export class UserHasEnrollmentActive extends ExceptionBase {
  static readonly message = 'El usuario ya tiene una matricula activa';

  public readonly code = 'USER.HAS_ENROLLMENT_ACTIVE';

  constructor(cause?: Error, metadata?: unknown) {
    super(UserHasEnrollmentActive.message, cause, metadata);
  }
}

export class UserHasNoEnrollmentActive extends ExceptionBase {
  static readonly message = 'El usuario no tiene una matricula activa';

  public readonly code = 'USER.HAS_NO_ENROLLMENT_ACTIVE';

  constructor(cause?: Error, metadata?: unknown) {
    super(UserHasNoEnrollmentActive.message, cause, metadata);
  }
}

export class NoCoursesAvailable extends ExceptionBase {
  static readonly message = 'No hay cursos disponibles';

  public readonly code = 'NO_COURSES_AVAILABLE';

  constructor(cause?: Error, metadata?: unknown) {
    super(NoCoursesAvailable.message, cause, metadata);
  }
}

export class TrainingRecordAlreadyExists extends ExceptionBase {
  static readonly message = 'Ya existe un registro para reportes de conducción';

  public readonly code = 'TRAINING_RECORD.ALREADY_EXISTS';

  constructor(cause?: Error, metadata?: unknown) {
    super(TrainingRecordAlreadyExists.message, cause, metadata);
  }
}
