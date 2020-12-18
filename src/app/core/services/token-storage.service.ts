import {Injectable} from '@angular/core';
import {User} from "../model/user";

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const USER_ROLES = 'auth-user-roles';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() {
  }

  signOut() {
    window.sessionStorage.clear();
  }

  public saveToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user) {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public updateUserName(user: User) {
    let u = JSON.parse(sessionStorage.getItem(USER_KEY));
    u.username = user.username;
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(u));
  }

  public getUser() {
    return JSON.parse(sessionStorage.getItem(USER_KEY));
  }

  public isThisConnectedUser(idUser: string) {
    return idUser === JSON.parse(sessionStorage.getItem(USER_KEY)).userId;
  }

  public saveUserAccountsRoles(userAccountsRoles) {
    window.sessionStorage.removeItem(USER_ROLES);
    window.sessionStorage.setItem(USER_ROLES, JSON.stringify(userAccountsRoles));
  }

  public getUserRoles() {
    return JSON.parse(sessionStorage.getItem(USER_ROLES));
  }

}
