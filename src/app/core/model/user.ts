import {Role} from "./role";

export class User {
  userId: string;
  username: string;
  email: string;
  roles: Role[];
  isEnabled: boolean;
  creationDate: Date;

  constructor(userId: string) {
    this.userId = userId;
  }
}
