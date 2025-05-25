import { Injectable, NotImplementedException } from '@nestjs/common';
import { Mapper } from '../../../platform/ddd';
import { RoleDomain } from '../domain/aggregates/role.domain';
import { RoleEntity } from '@src/iam/infrastructure/persistence/relational/entities/role.entity';
import { SimpleRoleResponseDto } from '../queries/find-roles-paginated/dto/simple-role.response.dto';

/**
 * Mapper constructs objects that are used in different layers:
 * Record is an object that is stored in a database,
 * Entity is an object that is used in application domain layer,
 * and a ResponseDTO is an object returned to a user (usually as json).
 */

@Injectable()
export class RoleMapper implements Mapper<RoleDomain, RoleEntity> {
  persistenceToResponse(entity: RoleEntity): Promise<SimpleRoleResponseDto> {
    const dto = new SimpleRoleResponseDto({
      id: entity.id,
      status: entity.status,
      name: entity.name,
      isSystem: entity.isSystem,
      updatedAt: entity.updatedAt.toISOString(),
      createdAt: entity.updatedAt.toISOString(),
      description: entity.description,
      usersCount: 28,
    });
    return Promise.resolve(dto);
  }
  persistenceToDetailedResponse(entity: RoleEntity): Promise<any> {
    throw new Error('Method not implemented.');
  }
  domainToPersistence(domain: RoleDomain): Promise<RoleEntity> {
    const copy = domain.getProps();
    const entity = new RoleEntity();
    entity.id = copy.id;
    entity.name = copy.name;
    entity.description = copy.description;
    entity.isSystem = copy.isSystem;
    entity.createdAt = copy.createdAt;
    entity.updatedAt = copy.updatedAt;
    entity.status = copy.status;

    return Promise.resolve(entity);
  }

  persistenceToDomain(record: RoleEntity): Promise<RoleDomain> {
    const domain = new RoleDomain({
      id: record.id,
      createdAt: record.createdAt,
      updatedAt: record.updatedAt,
      props: {
        id: record.id,
        status: record.status,
        name: record.name,
        isSystem: record.isSystem,
        description: record.description,
      },
    });
    return Promise.resolve(domain);
  }

  domainToResponse(entity: RoleDomain): Promise<SimpleRoleResponseDto> {
    // const props = entity.getProps();
    // const response = new RoleResponseDto(entity);
    // response.email = props.email;
    // response.firstName = props.firstName;
    // response.lastName = props.lastName;
    // return Promise.resolve(response);
    throw new NotImplementedException();
  }

  /* ^ Data returned to the user is whitelisted to avoid leaks.
     If a new property is added, like password or a
     credit card number, it won't be returned
     unless you specifically allow this.
     (avoid blacklisting, which will return everything
      but blacklisted items, which can lead to a data leak).
  */
}
