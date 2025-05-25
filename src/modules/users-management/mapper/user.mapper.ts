import { Injectable } from '@nestjs/common';
import { Mapper } from '../../../platform/ddd';
import { UserDomain } from '../domain/aggregates/user.domain';
import { UserEntity } from '../infraestructure/persistence/relational/entity/user.entity';
import { UserDto } from '../dto/user.dto';

/**
 * Mapper constructs objects that are used in different layers:
 * Record is an object that is stored in a database,
 * Entity is an object that is used in application domain layer,
 * and a ResponseDTO is an object returned to a user (usually as json).
 */

@Injectable()
export class UserMapper implements Mapper<UserDomain, UserEntity> {
  persistenceToResponse(entity: UserEntity): Promise<UserDto> {
    const dto = new UserDto({
      id: entity.id,
      email: entity.email,
      firstName: entity.firstName,
      lastName: entity.lastName,
      // documentType: entity.documentType,
      documentIdentifier: entity.documentIdentifier,
      phoneNumber: entity.phoneNumber,
      roles: entity.roles,
      type: entity.type,
      createdAt: entity.createdAt,
      status: entity.status,
      updatedAt: entity.updatedAt,
      commonName: entity.commonName,
    });
    return Promise.resolve(dto);
  }

  domainToPersistence(domain: UserDomain): Promise<UserEntity> {
    const copy = domain.getProps();
    const entity = new UserEntity();
    entity.id = copy.id;
    entity.email = copy.email;
    entity.password = copy.password;
    entity.firstName = copy.firstName;
    entity.lastName = copy.lastName;
    entity.createdAt = copy.createdAt;
    entity.updatedAt = copy.updatedAt;
    entity.status = copy.status;
    entity.loginAttempts = copy.loginAttempts;

    return Promise.resolve(entity);
  }

  persistenceToDomain(record: UserEntity): Promise<UserDomain> {
    const domain = new UserDomain({
      id: record.id,
      createdAt: new Date(record.createdAt),
      updatedAt: new Date(record.updatedAt),
      props: {
        email: record.email,
        password: record.password,
        // documentType: record.documentType,
        documentIdentifier: record.documentIdentifier,
        status: record.status,
        firstName: record.firstName,
        lastName: record.lastName,
        phoneNumber: record.phoneNumber,
        // organizations: record.organizations,
        roles: record.roles,
        type: record.type,
        loginAttempts: record.loginAttempts,
      },
    });
    return Promise.resolve(domain);
  }
}
