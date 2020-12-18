import {UsersAssociation} from "./UsersAssociation";
import {EventType} from "./eventType";
import {Team} from "./Team";
import {EventWeather} from "./eventWeather";
import {EventComment} from "./eventComment";
import {User} from "./user";
import {Account} from "./Account";

export class Event {

  eventId: string;
  name: string;
  eventType: EventType;
  users: User[];
  account: Account;
  eventWeatherSet: EventWeather[];
  eventCommentSet: EventComment[];
  team: Team;
  creationDate: Date;
  eventDate: Date;
  eventEndDate: Date;
}
