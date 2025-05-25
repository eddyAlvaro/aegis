import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EntityRelationalHelper } from '../../../../../platform/utils/relational-entity-helper';
import { NullableType } from '../../../../../platform/utils/types/nullable.type';
import { RoleStatus } from '../../../../../modules/role-configuration/domain/types/role-status';
import { GrantId } from '@src/modules/role-configuration/domain/types/grants';
import { UserEntity } from '@src/modules/users-management/infraestructure/persistence/relational/entity/user.entity';

export enum GlobalType {
  Platform = 'PLATFORM',
  Organization = 'ORGANIZATION',
}

@Entity()
export class RoleEntity extends EntityRelationalHelper {
  @PrimaryColumn('text')
  id: string;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  description: string;

  @Column({
    type: 'enum',
    enum: GlobalType,
    nullable: false,
    default: GlobalType.Organization,
  })
  type: GlobalType;

  @Column({ type: 'boolean' })
  isSystem: boolean;

  @ManyToMany(() => UserEntity, (user: UserEntity) => user.roles)
  @JoinTable()
  users: UserEntity[];

  @Column({
    type: 'jsonb',
    nullable: false,
    default: [],
  })
  grantIds: GrantId[];

  @CreateDateColumn({ nullable: false, type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ nullable: false, type: 'timestamptz' })
  updatedAt: Date;

  @Column({
    type: 'enum',
    enum: RoleStatus,
    nullable: false,
  })
  status: RoleStatus;

  @DeleteDateColumn()
  deletedAt: NullableType<Date>;
}
