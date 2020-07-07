import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Page} from "../model/pagination/page";
import {Pageable} from "../model/pagination/pageable";
import {Event} from "../model/event";
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";
import {EventWeather} from "../model/eventWeather";
import {EventComment} from "../model/eventComment";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const API_URL = 'http://localhost:8080/v1/event-comment';

@Injectable({
  providedIn: 'root'
})
export class EventCommentService {


  constructor(private http: HttpClient) {
  }

  createEventComment(userId: string, eventId: string, newEventComment: EventComment): Observable<any> {
    const url = API_URL + '/event/' + eventId  + '/user/' + userId;
    return this.http.post(url, newEventComment, httpOptions);
  }

  deleteEventComment(eventCommentId: string): Observable<any> {
    const url = API_URL + '/' + eventCommentId  + '/delete';
    return this.http.post(url, httpOptions);
  }

}
