import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { routesV1 } from '../../../../config/app-routes';
import { Repository } from 'typeorm';
import { UserEntity } from '@src/modules/users-management/infraestructure/persistence/relational/entity/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserStatus } from '@src/modules/users-management/domain/types/user-status';
import { randomUUID } from 'crypto';
import { UserType } from '@src/modules/users-management/domain/types/user-type';
import { CommandBus } from '@nestjs/cqrs';
// import { SendForgotPasswordCommand } from '../send-forgot-password/send-forgot-password.command';
import {
  UserAlreadyExistsByDocument,
  UserAlreadyExistsByPhoneNumber,
  UserAlreadyExistsByRuc,
} from '../../domain/failures/register.failures';
import { MailService } from '../../../../mail/mail.service';
import { EmailAlreadyUsed } from '@src/users/domain/failures/user.failures';
import { RegisterEnrollmentDto } from './dtos/register-enrollment.dto';
import { DrivingTrainingRecordEntity } from '../../../driving/infraestructure/persistence/relational/entity/driving-training-record.entity';

@ApiTags(routesV1.authManagement.root)
@Controller(routesV1.version)
export class RegisterEnrollmentHttpController {
  constructor(
    @InjectRepository(UserEntity)
    private readonly typeOrmUserRepository: Repository<UserEntity>,
    @InjectRepository(DrivingTrainingRecordEntity)
    private readonly typeOrmDrivingTrainingRecordRepository: Repository<DrivingTrainingRecordEntity>,
  ) {}

  @ApiOperation({ summary: 'Register participant' })
  @Post(routesV1.authManagement.registerParticipant)
  async create(@Body() body: RegisterEnrollmentDto): Promise<any> {
    const existingUserByPhoneNumber = await this.typeOrmUserRepository.findOne({
      where: {
        phoneNumber: body.phoneNumber,
      },
    });

    if (existingUserByPhoneNumber) {
      throw new UserAlreadyExistsByPhoneNumber();
    }

    const existingUserByEmail = await this.typeOrmUserRepository.findOne({
      where: {
        email: body.email,
      },
    });

    if (existingUserByEmail) {
      throw new EmailAlreadyUsed();
    }

    const existingUser = await this.typeOrmUserRepository.findOne({
      where: {
        documentIdentifier: body.documentIdentifier,
      },
    });

    if (existingUser) {
      throw new UserAlreadyExistsByDocument();
    }

    // if (body instanceof RegisterJuridicParticipantDto) {
    //   const existingUserByRUC = await this.typeOrmUserRepository.findOne({
    //     where: {
    //       documentIdentifier: body.documentIdentifier,
    //     },
    //   });

    //   if (existingUserByRUC) {
    //     throw new UserAlreadyExistsByRuc();
    //   }
    // }

    const newUser = this.typeOrmUserRepository.create({
      ...body,
      id: randomUUID(),
      status: UserStatus.Active,
      type: UserType.Participant,
    });
    newUser.generateCommonName();
    await this.typeOrmUserRepository.save(newUser);

    const newDrivingTrainingRecord =
      this.typeOrmDrivingTrainingRecordRepository.create({
        id: randomUUID(),
        participant: newUser,
      });

    await this.typeOrmDrivingTrainingRecordRepository.save(
      newDrivingTrainingRecord,
    );

    //todo send email
    // const command = new SendForgotPasswordCommand({
    //   ...body,
    //   withActivation: true,
    //   isReactivation: null,
    // });

    // await this.commandBus.execute(command);

    // const commonName = await this.typeOrmUserRepository.findOne({
    //   where: {
    //     email: body.email,
    //   },
    // });

    // await this.mailService.sendGenericMail(
    //   `BIENVENIDO A DEOCASION - ${commonName?.commonName}`,
    //   {
    //     to: body.email,
    //     data: {
    //       message:
    //         'Te damos la bienvenida a nuestra plataforma donde podrás encontrar diversas oportunidades para adquirir bienes a través de una subasta. Mantente antento a las publicaciones de los eventos que realizamos en nuestra página. Atte, DeOcasion',
    //     },
    //   },
    // );
  }
}
