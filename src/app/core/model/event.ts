import {UsersAssociation} from "./UsersAssociation";
import {EventType} from "./eventType";

export class Event {

  eventId: string;
  name: string;
  eventType: EventType;
  associations: UsersAssociation[];
  creationDate: Date;
  eventDate: Date;
}
