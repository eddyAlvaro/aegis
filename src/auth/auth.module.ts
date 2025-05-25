import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AnonymousStrategy } from './strategies/anonymous.strategy';
import { JwtRefreshStrategy } from './strategies/jwt-refresh.strategy';
import { MailModule } from '../mail/mail.module';
import { SessionModule } from '../session/session.module';
import { UsersModule } from '../users/users.module';
import { IamModule } from '../iam/iam.module';
import { AccessControlModule, RolesBuilder } from 'nest-access-control';
import { RelationalRolePersistenceModule } from '../iam/infrastructure/persistence/relational/relational-persistence.module';

@Module({
  imports: [
    UsersModule,
    IamModule,
    SessionModule,
    PassportModule,
    MailModule,
    JwtModule.register({}),
    AccessControlModule.forRoles(new RolesBuilder()),
    RelationalRolePersistenceModule,
  ],
  controllers: [],
  providers: [JwtStrategy, JwtRefreshStrategy, AnonymousStrategy],
  exports: [],
})
export class AuthModule {}
