import {Component, OnDestroy, OnInit} from '@angular/core';
import {TokenStorageService} from './core/services/token-storage.service';
import {AuthService} from './core/services/auth.service';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs/internal/Subject';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username: string;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private tokenStorageService: TokenStorageService,
              private authService: AuthService) {
  }

  ngOnInit() {
    if(!!this.tokenStorageService.getToken()) {
      this.authService.updateUserState(true);
    }
    this.authService.userStateAsObs$
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe( value => {
        this.isLoggedIn = value;
        if (value) {
          const user = this.tokenStorageService.getUser();
          this.roles = user.roles;

          this.showAdminBoard = this.roles.indexOf('ROLE_ADMIN') > -1;
          this.showModeratorBoard = this.roles.indexOf('ROLE_MODERATOR') > -1;

          this.username = user.username;
        }
    })
    // this.isLoggedIn = !!this.tokenStorageService.getToken();


  }

  logout() {
    this.authService.updateUserState(true);
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  ngOnDestroy () {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
