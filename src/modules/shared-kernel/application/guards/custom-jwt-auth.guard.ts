import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SessionExpired } from '../../domain/failures/shared-kernel.failures';
import { JsonWebTokenError, TokenExpiredError } from '@nestjs/jwt';

@Injectable()
export class CustomAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info, context: ExecutionContext) {
    if (info instanceof TokenExpiredError) {
      throw new SessionExpired();
    }

    if (info instanceof JsonWebTokenError) {
      throw new UnauthorizedException({
        statusCode: 401,
        message: 'Token inválido',
        error: 'Token Inválido',
      });
    }

    // Si no hay errores pero no hay usuario (token no proporcionado o no válido)
    if (err || !user) {
      throw new UnauthorizedException('Acceso no autorizado');
    }

    return user;
  }
}
