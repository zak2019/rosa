import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from "../model/user";
import {of} from "rxjs/internal/observable/of";
import {Pageable} from "../model/pagination/pageable";
import {Page} from "../model/pagination/page";
import {UsersAssociation} from "../model/UsersAssociation";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
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

  updateUser(user: User):Observable<any> {
    const url = API_URL + 'user/update/';
    return this.http.post(url, user, httpOptions);
  }

  public getUsersByAdminIdAndAccount(pageable: Pageable,
                           searchStr: string,
                           idUser: String,
                           accountId: string): Observable<Page<UsersAssociation>> {
    let str;
    searchStr ? str =  searchStr : str = '';
    const url = API_URL + 'usersAssociation/page-invited-user/account/' + accountId + '/criteria'
      + '?inviterId=' + idUser
      + '&page=' + pageable.pageNumber
      + '&size=' + pageable.pageSize
      + '&sortBy=creationDate'
      + '&str=' + str;
    return this.http.get<Page<UsersAssociation>>(url, httpOptions);
  }

  inviteNewUsers(newUsers, accountId: string): Observable<any> {
    const url = API_URL + 'user/invite-users/' + accountId;
    return this.http.post(url, {emails: newUsers}, httpOptions);
  }

  completeUserRegistration(userAssocId: string, userData: User): Observable<any> {
    const url = API_URL + 'user/complete-account/' + userAssocId;
    return this.http.post(url, userData, httpOptions);

  }

}
