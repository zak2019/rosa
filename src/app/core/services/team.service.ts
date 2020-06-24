import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Team} from "../model/Team";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const API_URL = 'http://localhost:8080/v1/team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  constructor(private http: HttpClient) {
  }

  createNewTeam(accountId: string, newTeam: Team): Observable<any> {
    const url = API_URL + '/create-team/'+ accountId;
    return this.http.post(url, newTeam, httpOptions);
  }

  getTeamsByAccountId(accountId): Observable<any> {
    const url = API_URL + '/account/' + accountId;
    return this.http.get(url, httpOptions);
  }

  linkUsersToTeam(team: Team): Observable<any> {
    const url = API_URL + '/link-users';
    return this.http.post(url, team, httpOptions);
  }

  linkOneUserToTeam(teamId: string, userId: string): Observable<any> {
    const url = API_URL + '/' + teamId + '/user/' + userId;
    return this.http.post(url, httpOptions);
  }

}
