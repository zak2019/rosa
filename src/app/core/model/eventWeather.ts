import {User} from "./user";

export class EventWeather {

  eventWeatherId: string;
  event: Event;
  user: User;
  creationDate: Date;
  sunnyClear: boolean;
  sunnyCloud: boolean;
  rainy: boolean;
  storm: boolean;
}
