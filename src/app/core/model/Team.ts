import {User} from "./user";

export class Team {

  teamId: string;
  teamName: string;
  creationDate: Date;
  account: Account;
  linkedUsers : User[];

  constructor(teamId: string) {
    this.teamId = teamId;
    this.linkedUsers = [];
  }

}
