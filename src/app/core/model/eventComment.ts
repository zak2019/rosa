import {User} from "./user";

export class EventComment {

  eventCommentId: string;
  comment: string;
  event: Event;
  user: User;
  creationDate: Date;
  red: boolean;
  blue: boolean;
  green: boolean;
  yellow: boolean;
}
