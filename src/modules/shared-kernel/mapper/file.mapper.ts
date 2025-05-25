import { In, Repository } from 'typeorm';
import { FileEntity } from '../../../files/infrastructure/persistence/relational/entities/file.entity';
import { Mapper } from '../../../platform/ddd';
import { FileDomain } from '../domain/value-objects/file.domain';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { FileDto } from '../../../files/dto/file.dto';

@Injectable()
export class FileMapper implements Mapper<FileDomain, FileEntity> {
  constructor(
    @InjectRepository(FileEntity)
    protected readonly typeormFileEntity: Repository<FileEntity>,
  ) {}

  domainToPersistence(entity: FileDomain): Promise<FileEntity> {
    throw new Error('Method not implemented.');
  }

  persistenceToDomain(entity: FileEntity): Promise<FileDomain> {
    const fileDomain = new FileDomain({
      id: entity.id,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      props: {
        path: entity.path,
      },
    });
    return Promise.resolve(fileDomain);
  }
  persistenceToResponse(entity: FileEntity): Promise<FileDto> {
    const fileDto = new FileDto({ id: entity.id, path: entity.path });
    return Promise.resolve(fileDto);
  }
  persistenceToDetailedResponse(entity: FileEntity): Promise<FileDto> {
    const fileDto = new FileDto({ id: entity.id, path: entity.path });
    return Promise.resolve(fileDto);
  }

  async rawToPersistence(ids: string[]): Promise<FileEntity[]> {
    const files = await this.typeormFileEntity.findBy({ id: In(ids) });
    return files;
  }
}
