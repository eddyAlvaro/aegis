import { AggregateID, AggregateRoot } from '../../../../platform/ddd';
import { RoleStatus } from '../types/role-status';

// Properties that are needed for a user creation
export interface CreateRoleProps {
  id: AggregateID;
  name: string;
  description: string;
  isSystem: boolean;
  status: RoleStatus;
}

export interface RoleProps extends CreateRoleProps {}

export class RoleDomain extends AggregateRoot<RoleProps> {
  protected readonly _id: AggregateID;

  static create(create: CreateRoleProps): RoleDomain {
    /* Setting a default role since we are not accepting it during creation. */
    const props: RoleProps = { ...create };
    const user = new RoleDomain({ id: create.id, props });
    /* adding "RoleCreated" Domain Event that will be published
    eventually so an event handler somewhere may receive it and do an
    appropriate action. Multiple events can be added if needed. */
    // user.addEvent(
    //   new RoleCreatedDomainEvent({
    //     aggregateId: id,
    //     email: props.email,
    //   }),
    // );
    return user;
  }

  public validate(): void {}
}
