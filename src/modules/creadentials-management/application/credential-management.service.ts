import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../users-management/infraestructure/persistence/relational/entity/user.entity';
import { Repository } from 'typeorm';
import { UserNotFoundFailure } from '../../users-management/domain/failures/user.failure';
import {
  getGrantIdList,
  GrantId,
} from '../../role-configuration/domain/types/grants';
import { UserType } from '../../users-management/domain/types/user-type';
import { RoleStatus } from '../../role-configuration/domain/types/role-status';
import { ConfigService } from '@nestjs/config';
import { AllConfigType } from '../../../config/config.type';
import ms from 'ms';
import { JwtService } from '@nestjs/jwt';
import { PasswordResetTokenEntity } from '../infraestructure/persistence/relational/password-reset-token.entity';
import { randomUUID } from 'crypto';

export class CredentialManagementService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly typeormUserRepository: Repository<UserEntity>,
    @InjectRepository(PasswordResetTokenEntity)
    private readonly passwordResetTokenRepository: Repository<PasswordResetTokenEntity>,
    private configService: ConfigService<AllConfigType>,
    private jwtService: JwtService,
  ) {}

  static getGrants(user: UserEntity): GrantId[] {
    const userGrants = new Set<GrantId>();
    if (
      user.type === UserType.SuperAdmin ||
      user.type === UserType.PlatformAdmin
    ) {
      return getGrantIdList('platform');
    }

    user.roles
      .filter((role) => role.status === RoleStatus.Active)
      .forEach((role) => {
        role.grantIds.forEach((grants) => userGrants.add(grants));
      });
    return Array.from(userGrants);
  }

  async getUserGrants(userId: string): Promise<GrantId[]> {
    const user = await this.typeormUserRepository
      .createQueryBuilder('user')
      .where('user.id = :id', { id: userId })
      .getOne();

    if (!user) {
      throw new UserNotFoundFailure();
    }

    return CredentialManagementService.getGrants(user);
  }

  async generateForgotExpiresToken(user: UserEntity) {
    const tokenExpiresIn = this.configService.getOrThrow('auth.forgotExpires', {
      infer: true,
    });

    const tokenExpires: number = Date.now() + ms(tokenExpiresIn);

    const hash = await this.jwtService.signAsync(
      {
        forgotUserId: user.id,
      },
      {
        secret: this.configService.getOrThrow('auth.forgotSecret', {
          infer: true,
        }),
        expiresIn: tokenExpiresIn,
      },
    );

    await this.passwordResetTokenRepository.save({
      id: randomUUID(),
      user: {
        id: user.id,
      },
      token: hash,
      used: false,
      expiresAt: new Date(tokenExpires),
    });
    return {
      tokenExpires,
      hash,
    };
  }
}
