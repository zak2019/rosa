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

export const defaultWeather = [
    {
      name: 'Sunny clear',
      value: 0
    },
    {
      name: 'Sunny cloud',
      value: 0
    },
    {
      name: 'Rainy',
      value: 0
    },
    {
      name: 'Storm',
      value: 0
    }
  ];
