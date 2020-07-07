import {UsersAssociation} from "./UsersAssociation";
import {EventType} from "./eventType";
import {Team} from "./Team";
import {EventWeather} from "./eventWeather";
import {EventComment} from "./eventComment";

export class Event {

  eventId: string;
  name: string;
  eventType: EventType;
  associations: UsersAssociation[];
  eventWeatherSet: EventWeather[];
  eventCommentSet: EventComment[];
  team: Team;
  creationDate: Date;
  eventDate: Date;
}
