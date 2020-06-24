import {User} from "./user";
import {Role} from "./role";
import {Account} from "./Account";

export class UsersAssociation {

  associationId: string ;

  invitedUser: User;

  inviter: User;

  account: Account;

  creationDate: Date;

  isEnabled: boolean;

  roles: Role[];

  constructor(associationId: string) {
    this.associationId = associationId;
  }
}
