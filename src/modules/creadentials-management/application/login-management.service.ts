import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../users-management/infraestructure/persistence/relational/entity/user.entity';
import { Repository } from 'typeorm';
import { IncorrectCredentialsFailure } from '../../users-management/domain/failures/auth.failures';
import { UserStatus } from '../../users-management/domain/types/user-status';
import { UserType } from '../../users-management/domain/types/user-type';
import {
  CannotLoginBecauseUserIsNotVerified,
  CannotLoginBecauseUserIsSuspended,
  PasswordExpired,
} from '../domain/failures/auth.failures';
import { TokensData } from '../domain/types/token-data';
import { SessionService } from '../../../session/session.service';
import crypto, { randomUUID } from 'crypto';
import { randomStringGenerator } from '@nestjs/common/utils/random-string-generator.util';
import { AggregateID } from '../../../platform/ddd';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import ms from 'ms';
import { AllConfigType } from '../../../config/config.type';
import { subMonths } from 'date-fns';
import { CredentialManagementService } from './credential-management.service';
import { LoginUserRequestDto } from './dtos/login-user.request.dto';

export class LoginManagementService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly typeormUserRepository: Repository<UserEntity>,
    private readonly sessionService: SessionService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService<AllConfigType>,
    private readonly credentialsManagementService: CredentialManagementService,
  ) {}

  async loginUser(body: LoginUserRequestDto): Promise<TokensData> {
    const user = await this.typeormUserRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email: body.email })
      .getOne();

    if (!user) throw new IncorrectCredentialsFailure();

    const userStatus = this.getUserStatus(user);
    if (userStatus === UserStatus.Suspended) {
      throw new CannotLoginBecauseUserIsSuspended();
    }

    if (userStatus === UserStatus.Blocked) {
      throw new CannotLoginBecauseUserIsSuspended();
    }
    if (userStatus === UserStatus.NotVerified) {
      throw new CannotLoginBecauseUserIsNotVerified({ userId: user.id });
    }

    if (!(await user.isValidPassword(body.password))) {
      await this.handleInvalidPassword(user);
      throw new IncorrectCredentialsFailure();
    } else {
      await this.resetPasswordAttempts(user);
    }

    if (this.isPasswordExpired(user)) {
      const forgotExpirationTokenResponse =
        await this.credentialsManagementService.generateForgotExpiresToken(
          user,
        );
      throw new PasswordExpired(undefined, {
        tokenExpires: forgotExpirationTokenResponse.tokenExpires,
        hash: forgotExpirationTokenResponse.hash,
      });
    }

    return await this.createSessionAndGetTokens(user);
  }

  private getUserStatus(user: UserEntity) {
    const userType = user.type;

    if (
      [
        UserType.SuperAdmin,
        UserType.PlatformAdmin,
        UserType.PlatformUser,
        UserType.Participant,
      ].includes(userType)
    ) {
      return user.status;
    }
  }

  private isPasswordExpired(user: UserEntity): boolean {
    const passwordUpdatedAt = user.passwordUpdatedAt;
    if (!passwordUpdatedAt) return true; // Si no hay registro, se considera expirada

    // Calcular la diferencia en milisegundos entre la fecha actual y la última actualización de la contraseña
    //const oneHourAgo = subHours(new Date(), 1); // Fecha y hora actuales menos una hora
    const sixMonthsAgo = subMonths(new Date(), 6); // Fecha y hora actuales menos una hora

    return new Date(passwordUpdatedAt) < sixMonthsAgo; // Si la última actualización fue hace más de una hora, consideramos que la contraseña ha expirado
  }

  private async handleInvalidPassword(user: UserEntity) {
    user.addLoginAttempt();
    await this.typeormUserRepository.save(user);
  }

  private async resetPasswordAttempts(user: UserEntity) {
    user.resetPasswordAttempts();
    await this.typeormUserRepository.save(user);
  }

  private async createSessionAndGetTokens(
    user: UserEntity,
  ): Promise<TokensData> {
    const session = await this.sessionService.create({
      id: randomUUID(),
      hash: this.generateSessionHash(),
      user,
    });
    return this.getTokensData({
      id: user.id,
      sessionId: session.id,
      hash: session.hash,
    });
  }

  private generateSessionHash(): string {
    return crypto
      .createHash('sha256')
      .update(randomStringGenerator())
      .digest('hex');
  }

  private async getTokensData({
    id,
    sessionId,
    hash,
  }: {
    id: AggregateID;
    sessionId: string;
    hash: string;
  }): Promise<TokensData> {
    const tokenExpiresIn = this.configService.getOrThrow('auth.expires', {
      infer: true,
    });

    const tokenExpires = Number(Date.now() + ms(tokenExpiresIn));

    const [token, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { id, sessionId },
        {
          secret: this.configService.getOrThrow('auth.secret', {
            infer: true,
          }),
          expiresIn: tokenExpiresIn,
        },
      ),
      this.jwtService.signAsync(
        { sessionId, hash },
        {
          secret: this.configService.getOrThrow('auth.refreshSecret', {
            infer: true,
          }),
          expiresIn: this.configService.getOrThrow('auth.refreshExpires', {
            infer: true,
          }),
        },
      ),
    ]);

    return { token, refreshToken, tokenExpires };
  }
}
