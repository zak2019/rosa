import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Page} from "../model/pagination/page";
import {Pageable} from "../model/pagination/pageable";
import {Event} from "../model/event";
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";
import {EventWeather} from "../model/eventWeather";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const API_URL = 'http://localhost:8080/v1/event-weather';

@Injectable({
  providedIn: 'root'
})
export class EventWeatherService {


  constructor(private http: HttpClient) {
  }

  createEventWeather(userId: string, eventId: string, newEventWeather: EventWeather): Observable<any> {
    const url = API_URL + '/event/' + eventId  + '/user/' + userId;
    return this.http.post(url, newEventWeather, httpOptions);
  }

}
