import { DomainEvent, DomainEventProps } from '@platform/ddd';

export class UserCreatedDomainEvent extends DomainEvent {
  readonly email: string;

  constructor(props: DomainEventProps<UserCreatedDomainEvent>) {
    super(props);
    this.email = props.email;
  }
}
