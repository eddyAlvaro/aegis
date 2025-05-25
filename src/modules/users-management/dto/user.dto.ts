// import { DocumentType } from '../../organization-management/domain/types/document-type.enum';
import { UserType } from '../domain/types/user-type';
import { UserStatus } from '../domain/types/user-status';

export class UserDto {
  constructor(props: UserDto) {
    this.id = props.id;
    this.status = props.status;
    this.email = props.email;
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    // this.documentType = props.documentType;
    this.documentIdentifier = props.documentIdentifier;
    this.phoneNumber = props.phoneNumber;
    this.type = props.type;
    this.roles = props.roles;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.commonName = props.commonName;
    // this.organizations = props.organizations;
    // this.commonName = props.commonName;
  }
  id: string;

  email: string;

  firstName: string | null;

  lastName: string | null;

  status: UserStatus;

  // documentType: DocumentType;
  // organizations: {
  //   id: string;
  //   name: string;
  // }[];

  roles: any[];

  documentIdentifier: string;

  phoneNumber: string;

  type: UserType;

  createdAt: Date;

  updatedAt: Date;

  commonName: string | null;
}
