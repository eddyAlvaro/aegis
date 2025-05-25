import { FileDomain } from '../../../../domain/value-objects/file.domain';
import * as O from 'fp-ts/Option';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { FileMapper } from '../../../../mapper/file.mapper';
import { FileRepositoryPort } from '../../../../domain/output-ports/file.repository.port';

import { TypeORMRepositoryBase } from '../../../../../../platform/db/typeorm-repository.base';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { FileEntity } from '@src/files/infrastructure/persistence/relational/entities/file.entity';

@Injectable()
export class FileRepository
  extends TypeORMRepositoryBase<FileDomain, FileEntity>
  implements FileRepositoryPort
{
  public constructor(
    @InjectRepository(FileEntity)
    protected readonly typeOrmRepository: Repository<FileEntity>,
    protected readonly mapper: FileMapper,
    protected readonly eventEmitter: EventEmitter2,
  ) {
    super(typeOrmRepository, mapper, eventEmitter);
  }

  async findOneById(id: string): Promise<O.Option<FileDomain>> {
    const result = await this.typeOrmRepository.findOne({ where: { id: id } });
    return result
      ? O.some(await this.mapper.persistenceToDomain(result))
      : O.none;
  }
}
