import { randomUUID } from 'crypto';
import bcrypt from 'bcryptjs';
import { UserType } from '../types/user-type';
import { UserHasNoPasswordError } from '../events/user.failure';
// import { DocumentType } from '../../../organization-management/domain/types/document-type.enum';
import { AggregateID, AggregateRoot } from '../../../../platform/ddd';
import { UserStatus } from '../types/user-status';

// Properties that are needed for a user creation
export interface CreateUserProps {
  email: string;
  firstName: string | null;
  lastName: string | null;
  // documentType: DocumentType;
  documentIdentifier: string;
  phoneNumber: string;
  type: UserType;
  roles: any[];
  // organizations: { id: string }[];
}

export interface UserProps extends CreateUserProps {
  password: string | null;
  status: UserStatus;
  loginAttempts: number;
}

export class UserDomain extends AggregateRoot<UserProps> {
  protected readonly _id: AggregateID;

  static create(create: CreateUserProps): UserDomain {
    const id = randomUUID();
    const props: UserProps = {
      ...create,
      password: null,
      loginAttempts: 0,
      status: UserStatus.Active,
    };
    const user = new UserDomain({ id, props });
    return user;
  }

  hasAttempts(): boolean {
    return this.props.loginAttempts < 3;
  }

  get status(): UserStatus {
    return this.props.status;
  }

  async changePassword(password: string): Promise<void> {
    this.props.loginAttempts = 0;
    const salt = await bcrypt.genSalt();
    const cryptPassword = await bcrypt.hash(password, salt);
    this.props.password = cryptPassword;
  }

  activate() {
    this.props.status = UserStatus.Active;
  }

  public async isValidPassword(externalPass: string): Promise<boolean> {
    if (!this.props.password) throw new UserHasNoPasswordError();
    return bcrypt.compare(externalPass, this.props.password);
  }

  public addLoginAttempt() {
    this.props.loginAttempts += 1;
  }

  public resetPasswordAttempts() {
    this.props.loginAttempts = 0;
  }
  public validate(): void {}

  // makeBid(bid: BidEntity, participant: UserEntity) {
  //   const offer = bid.offer;
  //   const event = offer.event;
  //   const checkIfEventIsGuaranted = (): boolean => {
  //     return true;
  //   };
  //
  //   if (!checkIfEventIsGuaranted()) {
  //     if (participant.wallet) {
  //       participant.wallet.availableBalance -= 200;
  //       //participant.guarantedEvents.push(event.id);
  //     }
  //   }
  // }
  //
  // getMyGuararantedOffers(userId: string) {
  //   const typeOrmOfferRepository: Repository<OfferEntity> | null = null;
  //
  //   if (typeOrmOfferRepository === null) {
  //     return;
  //   }
  //   const myGuarantedOffers = typeOrmOfferRepository.find({
  //     where: { bid: { bidHistories: { participant: { id: userId } } } },
  //   });
  // }
}
