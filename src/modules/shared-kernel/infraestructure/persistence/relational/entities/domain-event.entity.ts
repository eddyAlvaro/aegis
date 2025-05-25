import { ApiProperty } from '@nestjs/swagger';
import { AuditableEvent } from '@src/modules/shared-kernel/domain/entities/auditable-event';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('auditable_event')
export class AuditableEventEntity {
  @ApiProperty({
    description: 'ID único del evento',
    type: String,
    maxLength: 40,
  })
  @PrimaryColumn({ type: 'varchar', length: 120 })
  eventId: string;

  @ApiProperty({
    description: 'Stream ID al que pertenece el evento',
    type: String,
    maxLength: 120,
  })
  streamId: string;

  @ApiProperty({
    description: 'Versión del evento dentro del stream',
    type: Number,
  })
  @PrimaryColumn({ type: 'int' })
  version: number;

  @ApiProperty({
    description: 'Nombre del evento ocurrido',
    type: String,
  })
  @Column()
  event: AuditableEvent;

  @ApiProperty({
    description: 'Payload del evento en formato JSON',
    type: Object,
    example: { key: 'value' },
  })
  @Column({ type: 'jsonb', default: {} })
  payload: Record<string, any>;

  @ApiProperty({
    description: 'ID del agregado relacionado al evento',
    type: String,
  })
  @Column()
  aggregateId: string;

  @ApiProperty({
    description: 'Fecha y hora en la que ocurrió el evento',
    type: Date,
    format: 'date-time',
  })
  @Column({ type: 'timestamptz' })
  occurredOn: Date;

  @ApiProperty({
    description: 'ID de correlación para rastrear una solicitud',
    type: String,
    maxLength: 255,
    nullable: true,
  })
  @Column({ type: 'varchar', length: 255, nullable: true })
  correlationId: string | null;

  @ApiProperty({
    description: 'ID de causa para rastrear la relación entre eventos',
    type: String,
    maxLength: 255,
    nullable: true,
  })
  @Column({ type: 'varchar', length: 255, nullable: true })
  causationId: string | null;
}
