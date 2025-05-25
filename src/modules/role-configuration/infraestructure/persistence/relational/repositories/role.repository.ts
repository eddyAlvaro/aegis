import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { TypeORMRepositoryBase } from '../../../../../../platform/db/typeorm-repository.base';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleRepositoryPort } from '@src/modules/role-configuration/domain/output-ports/role-repository.port';
import { RoleDomain } from '@src/modules/role-configuration/domain/aggregates/role.domain';
import { RoleEntity } from '@src/iam/infrastructure/persistence/relational/entities/role.entity';
import { RoleMapper } from '@src/modules/role-configuration/mapper/role.mapper';

/**
 *  Repository is used for retrieving/saving domain entities
 * */
@Injectable()
export class RoleRepository
  extends TypeORMRepositoryBase<RoleDomain, RoleEntity>
  implements RoleRepositoryPort
{
  public constructor(
    @InjectRepository(RoleEntity)
    repository: Repository<RoleEntity>,
    mapper: RoleMapper,
    eventEmitter: EventEmitter2,
  ) {
    super(repository, mapper, eventEmitter);
  }
}
