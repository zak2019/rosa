import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BehaviorSubject} from 'rxjs/internal/BehaviorSubject';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userState = new BehaviorSubject<boolean>(false);
  public userStateAsObs$ = this.userState.asObservable();

  constructor(private http: HttpClient) {
  }

  login(credentials): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }

  register(registerData): Observable<any> {
    return this.http.post(AUTH_API + 'signup', registerData, httpOptions);
  }

  updateUserState(state: boolean) {
    this.userState.next(state);
  }
}
