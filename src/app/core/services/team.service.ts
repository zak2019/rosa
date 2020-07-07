import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Team} from "../model/Team";
import {Account} from "../model/Account";
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const API_URL = 'http://localhost:8080/v1/team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private currentTeams = new BehaviorSubject<Team[]>(null);
  public currentTeamsAsObs$ = this.currentTeams.asObservable();

  constructor(private http: HttpClient) {
  }

  setCurrentTeams(teams: Team[]) {
    this.currentTeams.next(teams);
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
