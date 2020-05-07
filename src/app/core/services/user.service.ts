import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const API_URL = 'http://localhost:8080/v1/';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUserByUserName(userName: string): Observable<any> {
    return this.http.get(API_URL + 'user/username/' + userName);

  }

  getUserByUserId(userId: string): Observable<any> {
    return this.http.get(API_URL + 'user/userId/' + userId);
  }

}
