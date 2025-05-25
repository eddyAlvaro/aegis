import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';
import { AuditableEventEntity } from '../../infraestructure/persistence/relational/entities/domain-event.entity';
import {
  AuditableEventSealed,
  ExecutorSimpleSealed,
  ExecutorSource,
  ExecutorSourceSealed,
} from '../../domain/entities/auditable-event';
import { ulid } from 'ulidx';
import { QueryRequestDto } from '@src/platform/api/query.request.dto';
import { PaginatedQueryRequestDto } from '@src/platform/api/paginated-query.request.dto';
import {
  applyFilters,
  applySorts,
} from '@src/platform/utils/pagination/pagination-utils';
import { FilterOptions } from '@src/platform/ddd';
import { AuditableEventDto } from '../dtos/auditable-event.dto';
import { UserEntity } from '@src/modules/users-management/infraestructure/persistence/relational/entity/user.entity';
import { Logger } from '@nestjs/common';
export class AuditableEventService {
  private readonly logger = new Logger(AuditableEventService.name);
  constructor(
    @InjectRepository(AuditableEventEntity)
    private readonly auditableEventRepository: Repository<AuditableEventEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  private buildCommonQueryBuilder() {
    const queryBuilder =
      this.auditableEventRepository.createQueryBuilder('auditableEvent');

    return queryBuilder;
  }

  private buildQueryBuilder(query: QueryRequestDto | PaginatedQueryRequestDto) {
    const queryBuilder = this.buildCommonQueryBuilder();

    this.processCustomFilters(queryBuilder, query.filterOptions || []);
    applyFilters(queryBuilder, query.filterOptions || [], 'auditableEvent');
    applySorts(queryBuilder, query.sortOptions || [], 'auditableEvent');

    return queryBuilder;
  }

  async viewAuditableEvents(
    params: QueryRequestDto,
  ): Promise<AuditableEventDto[]> {
    const queryBuilder = this.buildQueryBuilder(params);

    const records = await queryBuilder.getMany();

    return records;
  }

  private processCustomFilters(
    queryBuilder: SelectQueryBuilder<AuditableEventEntity>,
    filterOptions: FilterOptions[],
  ) {
    const customSearchIndex = filterOptions.findIndex(
      (filter) => filter.field === 'quickSearch',
    );

    if (customSearchIndex !== -1) {
      const customSearchFilter = filterOptions.splice(customSearchIndex, 1)[0];

      if (customSearchFilter.value) {
        const searchValue = `%${customSearchFilter.value}%`;
        queryBuilder.andWhere(
          new Brackets((qb) => {
            qb.where('auditableEvent.id LIKE :search', {
              search: searchValue,
            });
          }),
        );
      }
    }
  }

  async save(
    aggregate: { type: string; id: string },
    executorSealed: ExecutorSimpleSealed,
    domainEventSealed: AuditableEventSealed,
  ) {
    let fullExecutorSealed: ExecutorSourceSealed | null = null;
    switch (executorSealed.source) {
      case ExecutorSource.User:
        const user = await this.userRepository.findOneOrFail({
          where: { id: executorSealed.id },
        });
        fullExecutorSealed = {
          source: ExecutorSource.User,
          id: executorSealed.id,
          commonName: user.commonName,
          type: user.type,
        };
        break;

      case ExecutorSource.System:
        fullExecutorSealed = {
          source: ExecutorSource.System,
        };
        break;
    }
    const domainEvent = this.auditableEventRepository.create({
      streamId: `${aggregate.type}-${aggregate.id}`,
      version: 1,
      eventId: ulid(),
      aggregateId: aggregate.id,
      occurredOn: new Date(),
      correlationId: null,
      causationId: null,
      ...domainEventSealed,
      payload: {
        ...domainEventSealed.payload,
        executor: fullExecutorSealed,
      },
    });
    this.logger.debug(`Saving domain event: ${JSON.stringify(domainEvent)}`);
    return this.auditableEventRepository.save(domainEvent);
  }

  async saveRaw(
    aggregate: { type: string; id: string },
    executorSealed: ExecutorSourceSealed,
    domainEventSealed: AuditableEventSealed,
  ) {
    const domainEvent = this.auditableEventRepository.create({
      streamId: `${aggregate.type}-${aggregate.id}`,
      version: 1,
      eventId: ulid(),
      aggregateId: aggregate.id,
      occurredOn: new Date(),
      correlationId: null,
      causationId: null,
      ...domainEventSealed,
      payload: {
        ...domainEventSealed.payload,
        executor: executorSealed,
      },
    });
    this.logger.debug(`Saving domain event: ${JSON.stringify(domainEvent)}`);
    return this.auditableEventRepository.save(domainEvent);
  }
}
