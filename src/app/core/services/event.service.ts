import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Page} from "../model/pagination/page";
import {Pageable} from "../model/pagination/pageable";
import {Event} from "../model/event";
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const API_URL = 'http://localhost:8080/v1/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private newEvent = new BehaviorSubject<Event>(null);
  public newEventAsObs$ = this.newEvent.asObservable();

  constructor(private http: HttpClient) {
  }

  createEvent(newEvent): Observable<any> {
    return this.http.post(API_URL, newEvent, httpOptions);
  }

  public getPageEventsByUserIdAndAccountId(pageable: Pageable,
                                     idUser: string,
                                     accountId: string): Observable<Page<Event>> {

    const url = API_URL + '/account/' + accountId + '/user/' + idUser + '/criteria'
      + '?page=' + pageable.pageNumber
      + '&size=' + pageable.pageSize
      + '&sortBy=eventDate';
    return this.http.get<Page<Event>>(url, httpOptions);
  }

  public getPageEventsToComeByUserIdAndAccountId(pageable: Pageable,
                                     idUser: string,
                                     accountId: string): Observable<Page<Event>> {

    const url = API_URL + '/to-come/account/' + accountId + '/user/' + idUser + '/criteria'
      + '?page=' + pageable.pageNumber
      + '&size=' + pageable.pageSize
      + '&sortBy=eventDate';
    return this.http.get<Page<Event>>(url, httpOptions);
  }

  public setNewEvent(event: Event) {
    this.newEvent.next(event);
  }
}
