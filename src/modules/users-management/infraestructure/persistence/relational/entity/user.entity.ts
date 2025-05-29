import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  UpdateDateColumn,
  PrimaryColumn,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import bcrypt from 'bcryptjs';
// import { SimpleDomainFailure } from '@src/modules/shared-kernel/domain/failures/shared-kernel.failures';
import { ColumnNumericTransformer } from '@src/platform/db/transformers/column-numeric-transformer.dto';
import { UserHasNoPasswordError } from '../../../../domain/events/user.failure';
import { EntityRelationalHelper } from '../../../../../../platform/utils/relational-entity-helper';
import { RoleEntity } from '../../../../../../iam/infrastructure/persistence/relational/entities/role.entity';
import { UserType } from '../../../../domain/types/user-type';
import { SimpleDomainFailure } from '../../../../../shared-kernel/domain/failures/shared-kernel.failures';
import { UserStatus } from '../../../../domain/types/user-status';
import { EnrollmentRecordEntity } from './enrollment-record.entity';

@Entity()
export class UserEntity extends EntityRelationalHelper {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ type: 'varchar', unique: true, nullable: false })
  email: string;

  @Column({ type: 'varchar', nullable: true })
  password: string | null;

  @Index()
  @Column({ type: String, nullable: true })
  firstName: string | null;

  @Index()
  @Column({ type: String, nullable: true })
  lastName: string | null;

  @Column({ type: String, nullable: false, default: '' })
  commonName: string;

  // @Column({ type: 'enum', enum: DocumentType, nullable: false })
  // documentType: DocumentType;

  @Column({ type: 'varchar', length: 50, nullable: false })
  documentIdentifier: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  phoneNumber: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  currentLicense: 'A-I' | 'A-IIb';

  // todo tabla category
  @Column({ type: 'varchar', length: 50, nullable: true })
  desiredLicense: 'A-I' | 'A-IIb';

  // @Column({ type: 'varchar', length: 50, nullable: true })
  // matricula: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  procedureType: 'RECATEGOROZACION' | 'TRANSFERENCIA';

  @Column({ type: 'timestamptz', nullable: true })
  classStartDate: Date | null;

  @Column({ type: 'timestamptz', nullable: true })
  classEndDate: Date | null;

  @Column({ type: 'varchar', length: 50, nullable: true })
  schedule: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  days: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  shift: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  issueDate: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  course: 'COURSE_1' | 'COURSE_2' | 'COURSE_3';

  @Column({ type: 'varchar', length: 50, nullable: true })
  occupation: string;

  // @Column({ type: 'varchar', length: 10, nullable: true })
  // otp: string | null;

  // @Column({ type: 'timestamptz', nullable: true })
  // otpExpiry: Date | null;

  // @Column({ type: 'varchar', length: 50, nullable: false })
  // phoneCountryCode: string;

  @Column({ type: 'enum', enum: UserType, nullable: false })
  type: UserType;

  @ManyToMany(() => RoleEntity, (role) => role.users, { cascade: true })
  roles: RoleEntity[];

  @Column({ type: 'enum', enum: UserStatus, nullable: false })
  status: UserStatus;

  // @OneToMany(
  //   () => PasswordResetTokenEntity,
  //   (passwordResetToken) => passwordResetToken.user,
  // )
  // passwordResetTokens: PasswordResetTokenEntity[];

  // @OneToMany(
  //   () => TransferenceSupportEntity,
  //   (transference) => transference.participant,
  // )
  // transferences: TransferenceSupportEntity[];

  // @OneToMany(() => PaymentEntity, (payment) => payment.participant)
  // payments: PaymentEntity[];
  //
  // @OneToMany(() => PaymentEntity, (payment) => payment.reviewer)
  // reviewedPayments: PaymentEntity[];
  //

  // @Column({
  //   type: 'varchar',
  //   default: 'NATURAL_PERSON',
  //   nullable: true,
  // })
  // personType: 'NATURAL_PERSON' | 'JURIDIC_PERSON';

  // Campos adicionales de DTO
  // @Column({ type: 'varchar', nullable: true })
  // gender: 'MALE' | 'FEMALE' | null;

  // @Column({ type: 'varchar', nullable: true })
  // maritalStatus: 'SINGLE' | 'MARRIED' | 'WIDOWED' | 'DIVORCED' | null;

  @Column({ type: 'date', nullable: true })
  birthDate: Date | null;

  // @Column({ type: 'varchar', nullable: true })
  // businessName: string | null; // Razón social

  // @Column({ type: 'varchar', nullable: true })
  // legalRepresentative: string | null; // Representante legal

  // @Column({ type: 'enum', enum: DocumentType, nullable: true, default: null })
  // legalRepresentativeDocumentType: DocumentType | null;

  // @Column({ type: 'varchar', length: 50, nullable: true, default: null })
  // legalRepresentativeDocumentIdentifier: string | null;

  // @Column({ type: 'varchar', nullable: true })
  // taxAddress: string | null; // Domicilio fiscal

  @Column({ type: Number, nullable: false, default: 0 })
  loginAttempts: number;

  @Column({ type: 'timestamptz', nullable: true })
  lastResetPasswordDelivery: Date | null;

  @Column({
    type: 'timestamptz',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  passwordUpdatedAt: Date;

  @Column({ type: 'timestamptz', default: null })
  passwordExpirationNotifiedAt: Date | null;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @Column({ type: 'timestamptz', nullable: true })
  connectedAt: Date | null;

  @Column({ type: 'varchar', length: 255, nullable: true })
  suspensionReason: string | null;

  @OneToMany(
    () => EnrollmentRecordEntity,
    (enrollment) => enrollment.enrolledUser,
  )
  enrollmentRecords: EnrollmentRecordEntity[];
  // @OneToMany(
  //   () => DrivingTrainingRecordEntity,
  //   (driving) => driving.participant,
  // )
  // drivingTrainingRecords: DrivingTrainingRecordEntity[];

  generateCommonName() {
    let commonName = '';
    // if (this.personType === 'JURIDIC_PERSON') {
    //   commonName = this.businessName || 'Unknown business';
    // } else {
    commonName = `${this.firstName} ${this.lastName}`;
    // }
    this.commonName = commonName;
  }

  hasAttempts(): boolean {
    return this.loginAttempts < 3;
  }

  async isValidPassword(externalPass: string): Promise<boolean> {
    if (!this.password) throw new UserHasNoPasswordError();
    return bcrypt.compare(externalPass, this.password);
  }

  addLoginAttempt() {
    this.loginAttempts += 1;
  }

  public checkIfIsActive() {
    if (this.status !== UserStatus.Active) {
      throw new SimpleDomainFailure(
        `El usuario no puede realizar operaciones porque no esta activo`,
      );
    }
  }

  public checkIfIsParticipant() {
    if (this.type !== UserType.Participant) {
      throw new SimpleDomainFailure(
        `El usuario no puede realizar operaciones porque no es un participante`,
      );
    }
  }

  public resetPasswordAttempts() {
    this.loginAttempts = 0;
  }
  public resetLastPasswordMailDelivery() {
    this.lastResetPasswordDelivery = null;
  }

  async changePassword(password: string): Promise<void> {
    this.loginAttempts = 0;
    const salt = await bcrypt.genSalt();
    const cryptPassword = await bcrypt.hash(password, salt);
    this.password = cryptPassword;
    //this.passwordUpdatedAt = addMonths(new Date(), 6);
    this.passwordUpdatedAt = new Date();
    this.passwordExpirationNotifiedAt = null;
  }

  activate() {
    this.status = UserStatus.Active;
  }

  // toExportable() {
  //   return {
  //     ['ID']: this.id,
  //     ['Nombres y apellidos / Razón social']: this.commonName,
  //     ['Tipo de documento']: this.documentType,
  //     ['Número de documento']: this.documentIdentifier,
  //     ['Número de teléfono']: this.phoneNumber,
  //     ['Correo electrónico']: this.email,
  //     ['Fecha de creación']: format(this.createdAt, 'yyyy-MM-dd hh:mm a'),
  //     ['Fecha de última conexión']: this.connectedAt
  //       ? format(this.connectedAt, 'yyyy-MM-dd hh:mm a')
  //       : '',
  //     ['Saldo disponible']: this.wallet.availableBalance,
  //     ['Saldo garantizado']: this.wallet.guaranteedBalance,
  //     ['Estado de usuario']: userStatusMap[this.status].name,
  //   };
  // }
}
