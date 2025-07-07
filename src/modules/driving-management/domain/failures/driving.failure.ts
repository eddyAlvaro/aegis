import { ExceptionBase } from '../../../../platform/exceptions';

export class VehicleNotFound extends ExceptionBase {
  static readonly message = 'Vehículo no encontrado';

  public readonly code = 'VEHICLE.NOT_FOUND';

  constructor(cause?: Error, metadata?: unknown) {
    super(VehicleNotFound.message, cause, metadata);
  }
}
