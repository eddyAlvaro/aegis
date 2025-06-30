import { UserEntity } from '@src/modules/users-management/infraestructure/persistence/relational/entity/user.entity';
import { Entity, Column, ManyToOne, RelationId, PrimaryColumn } from 'typeorm';

@Entity()
export class PasswordResetTokenEntity {
  @PrimaryColumn('text')
  id: string;

  @ManyToOne(() => UserEntity, (user) => user.passwordResetTokens)
  user: UserEntity;

  @RelationId(
    (passwordResetToken: PasswordResetTokenEntity) => passwordResetToken.user,
  )
  userId: string;

  @Column({ unique: true })
  token: string;

  @Column({ default: false })
  used: boolean;

  @Column()
  expiresAt: Date;
}
