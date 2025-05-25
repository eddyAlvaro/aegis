import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { TypeORMRepositoryBase } from '../../../../../../platform/db/typeorm-repository.base';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as O from 'fp-ts/lib/Option';
import { UserEntity } from '../entity/user.entity';
import { UserRepositoryPort } from '../../../../domain/output-ports/user-repository.port';
import { UserMapper } from '../../../../mapper/user.mapper';
import { UserDomain } from '../../../../domain/aggregates/user.domain';

/**
 *  Repository is used for retrieving/saving domain entities
 * */
@Injectable()
export class UserRepository
  extends TypeORMRepositoryBase<UserDomain, UserEntity>
  implements UserRepositoryPort
{
  public constructor(
    @InjectRepository(UserEntity)
    repository: Repository<UserEntity>,
    mapper: UserMapper,
    eventEmitter: EventEmitter2,
  ) {
    super(repository, mapper, eventEmitter);
  }
  async findOneByEmail(email: string): Promise<O.Option<UserDomain>> {
    const user = await this.findOne({
      where: { email: email },
      relations: ['organizations'],
    });
    return user;
  }
  async findOneById(id: string): Promise<O.Option<UserDomain>> {
    const user = await this.findOne({
      where: { id: id },
    });
    return user;
  }
}
