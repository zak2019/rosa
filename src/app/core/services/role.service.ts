import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/index";
import {UsersAssociation} from "../model/UsersAssociation";
import {takeUntil} from "rxjs/operators";
import {TokenStorageService} from "./token-storage.service";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const API_URL = 'http://localhost:8080/v1/role';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  userAccountRoles;
  isAdmin: boolean;
  constructor(private http: HttpClient,
              private tokenStorageService: TokenStorageService) {
  }

  getUserRolesByUserId(userId: string): Observable<any> {
    const url = API_URL + '/user/' + userId;
    return this.http.get(url, httpOptions);
  }

  manageUserAccountsRoles(userAccountsAssoc) {
    this.userAccountRoles = [];
    userAccountsAssoc.forEach(assoc => {
      this.userAccountRoles.push({
        account: assoc.account.accountId,
        roles: assoc.roles
      })
    });
    this.tokenStorageService.saveUserAccountsRoles(this.userAccountRoles);
  }

  isUserAdmin(userAccountRoles, accountId) {
    this.isAdmin = false;
    userAccountRoles.forEach(assoc => {
      if (assoc.account === accountId) {
        assoc.roles.forEach(role => {
          if (role.name === 'ROLE_ADMIN') {
            this.isAdmin = true;
          }
        });
      }
    });
    return this.isAdmin;
  }
}
