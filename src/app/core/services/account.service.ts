import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Event} from "../model/event";
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";
import {Account} from "../model/Account";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
const API_URL = 'http://localhost:8080/v1/account/';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private currentAccount = new BehaviorSubject<Account>(null);
  public currentAccountAsObs$ = this.currentAccount.asObservable();

  constructor(private http: HttpClient) {
  }

  getAccountByAccountId(accountId: string): Observable<any> {
    let url = API_URL + accountId;
    return this.http.get(url, httpOptions);
  }

  setCurrentAccount(account: Account)  {
    this.currentAccount.next(account);
  }
}
