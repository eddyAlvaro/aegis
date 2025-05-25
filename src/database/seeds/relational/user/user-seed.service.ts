import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import bcrypt from 'bcryptjs';
import { RoleEntity } from '../../../../iam/infrastructure/persistence/relational/entities/role.entity';
import { UserEntity } from '../../../../modules/users-management/infraestructure/persistence/relational/entity/user.entity';
import { randomUUID } from 'crypto';
// import { DocumentType } from '../../../../modules/organization-management/domain/types/document-type.enum';
import { UserType } from '../../../../modules/users-management/domain/types/user-type';
// import { OrganizationEntity } from '../../../../modules/organization-management/infrastructure/persistence/relational/entities/organization.entity';
import { UserStatus } from '../../../../modules/users-management/domain/types/user-status';
import { SystemRole } from '@src/iam/domain/system-role';

@Injectable()
export class UserSeedService {
  constructor(
    @InjectRepository(UserEntity)
    private typeOrmUserRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private typeOrmRoleRepository: Repository<RoleEntity>,
    // @InjectRepository(OrganizationEntity)
    // private typeOrmOrganizationRepository: Repository<OrganizationEntity>,
  ) {}

  async createUser(props: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    type: UserType;
    role: string;
  }) {
    const count = await this.typeOrmUserRepository.count({
      where: {
        email: props.email,
      },
    });

    const americo = await this.typeOrmUserRepository.findOne({
      where: {
        email: 'ajac.110894@gmail.com',
      },
    });
    if (americo) {
      americo.firstName = 'Americo';
      americo.lastName = 'Albuquerque';
      americo.generateCommonName();
      await this.typeOrmUserRepository.save(americo);
    }

    const jose = await this.typeOrmUserRepository.findOne({
      where: {
        email: 'accesocred.prueba01@gmail.com',
      },
    });
    if (jose) {
      jose.firstName = 'Jose';
      jose.lastName = 'Barrios';
      jose.generateCommonName();
      await this.typeOrmUserRepository.save(jose);
    }

    if (!count) {
      const salt = await bcrypt.genSalt();
      const cryptPassword = await bcrypt.hash(props.password, salt);

      await this.typeOrmUserRepository.save(
        this.typeOrmUserRepository.create({
          id: randomUUID(),
          firstName: props.firstName,
          lastName: props.lastName,
          // documentType: DocumentType.Dni,
          documentIdentifier: '87382992',
          // phoneCountryCode: 'PE',
          phoneNumber: '879675566',
          status: UserStatus.Active,
          roles: [this.typeOrmRoleRepository.create({ id: props.role })],
          type: props.type,
          email: props.email,
          password: cryptPassword,
        }),
      );
    }
  }

  async run() {
    const usersCount = await this.typeOrmUserRepository.count();
    if (usersCount === 0) {
      await this.createUser({
        firstName: 'Marcos',
        lastName: 'Claros',
        email: 'admin@acceso.com.pe',
        password: 'Acceso123@@',
        type: UserType.SuperAdmin,
        role: SystemRole.SuperAdmin,
      });
    }
  }
}
