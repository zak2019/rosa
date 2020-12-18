import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/index";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const API_URL = 'http://localhost:8080/v1/usersAssociation';

@Injectable({
  providedIn: 'root'
})
export class UsersAssociationService {

  constructor(private http: HttpClient) {
  }

  getUsersAssociationByAssociationId(associationId: string): Observable<any> {
    const url = API_URL + '/find/' + associationId;
    return this.http.get(url, httpOptions);
  }

  deleteAssociation(associationId: string): Observable<any> {
    const url = API_URL + '/delete-user-assoc/' + associationId;
    return this.http.post(url, httpOptions);
  }

  getUsersAssociationByInvitedUserId(userId: string): Observable<any> {
    const url = API_URL + '/association/invitedUser/'+ userId;
    return this.http.get(url, httpOptions);
  }

  getUsersAssociationByAccountId(accountId: string): Observable<any> {
    const url = API_URL + '/invited-user/account/'+ accountId;
    return this.http.get(url, httpOptions);
  }

  addRoleToUserAssociation(associationId: string, role: string): Observable<any> {
    const url = API_URL + '/add-role-to-user-assoc/' + associationId + '/' + role;
    return this.http.post(url, httpOptions);
  }

  deleteRoleFromUserAssociation(associationId: string, role: string): Observable<any> {
    const url = API_URL + '/delete-role-from-user-assoc/' + associationId + '/' + role;
    return this.http.post(url, httpOptions);
  }
}
