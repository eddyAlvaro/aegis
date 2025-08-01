import { ExceptionBase } from '../../../../platform/exceptions';

export class EvaluationAlreadyExists extends ExceptionBase {
  static readonly message = 'El usuario ya tiene una evaluación';

  public readonly code = 'EVALUATION.HAS_EVALUATION_ACTIVE';

  constructor(cause?: Error, metadata?: unknown) {
    super(EvaluationAlreadyExists.message, cause, metadata);
  }
}

export class EvaluationNotFound extends ExceptionBase {
  static readonly message = 'No se encontró la evaluación';

  public readonly code = 'EVALUATION.NOT_FOUND';

  constructor(cause?: Error, metadata?: unknown) {
    super(EvaluationNotFound.message, cause, metadata);
  }
}
