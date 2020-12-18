import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Page} from "../model/pagination/page";
import {Pageable} from "../model/pagination/pageable";
import {Event} from "../model/event";
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";
import {DatePipe} from "@angular/common";

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

  constructor(private http: HttpClient,
              public datePipe: DatePipe) {
  }

  createEvent(accountId, newEvent): Observable<any> {
    let url = API_URL + /account/ + accountId;
    return this.http.post(url, newEvent, httpOptions);
  }

  createEvents(accountId, newEvent, eventHour, eventDates): Observable<any> {

    const multiEvents = {
      event: newEvent,
      dateList: eventDates,
      eventHour: eventHour
    };
    const url = API_URL + '/createEvents/account/' + accountId;
    return this.http.post(url, multiEvents, httpOptions);
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

  public getPageEventsByAccountId(pageable: Pageable,
                                           accountId: string): Observable<Page<Event>> {

    const url = API_URL + '/to-come/account/' + accountId + '/criteria'
      + '?page=' + pageable.pageNumber
      + '&size=' + pageable.pageSize
      + '&sortBy=eventDate';
    return this.http.get<Page<Event>>(url, httpOptions);
  }

  public getPageEventsByAccountIdAndTeamId(pageable: Pageable,
                                                    accountId: string,
                                                    teamId: string): Observable<Page<Event>> {

    const url = API_URL + '/account/' + accountId + '/team/' + teamId + '/criteria'
      + '?page=' + pageable.pageNumber
      + '&size=' + pageable.pageSize
      + '&sortBy=eventDate';
    return this.http.get<Page<Event>>(url, httpOptions);
  }

  public getPageEventsByUserIdAndAccountIdAndTeamId(pageable: Pageable,
                                                    idUser: string,
                                                    accountId: string,
                                                    teamId: string): Observable<Page<Event>> {

    const url = API_URL + '/account/' + accountId + '/user/' + idUser + '/team/' + teamId + '/criteria'
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

  public getPageEventsToComeByUserIdAndAccountIdAndTeamId(pageable: Pageable,
                                                          idUser: string,
                                                          accountId: string,
                                                          teamId: string): Observable<Page<Event>> {

    const url = API_URL + '/to-come/account/' + accountId + '/user/' + idUser + '/team/' + teamId + '/criteria'
      + '?page=' + pageable.pageNumber
      + '&size=' + pageable.pageSize
      + '&sortBy=eventDate';
    return this.http.get<Page<Event>>(url, httpOptions);
  }

  public getEventsByDatesAndAccountIdAndTeamId(accountId: string,
                                               teamId: string,
                                               startDate: Date,
                                               endDate: Date): Observable<Event[]> {

    const url =
      API_URL + '/account/' + accountId + '/team/' + teamId +
      '/dates?startDate=' + this.datePipe.transform(startDate, 'yyyy-MM-dd') +
      '&endDate=' + this.datePipe.transform(endDate, 'yyyy-MM-dd');
    return this.http.get<Event[]>(url, httpOptions);
  }

  public setNewEvent(event: Event) {
    this.newEvent.next(event);
  }
}
