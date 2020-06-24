import {Component, OnDestroy, OnInit} from '@angular/core';
import {TokenStorageService} from './core/services/token-storage.service';
import {AuthService} from './core/services/auth.service';
import {Subject} from 'rxjs/internal/Subject';
import {RoleService} from "./core/services/role.service";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  userId: string;

  private ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private tokenStorageService: TokenStorageService,
              private authService: AuthService,
              private roleService: RoleService) {
  }

  ngOnInit() {
    if(!!this.tokenStorageService.getToken()) {
      this.authService.updateUserState(true);
      this.getUserRolesAndAssocAccounts(this.tokenStorageService.getUser().userId);
    }
  }

  private getUserRolesAndAssocAccounts(userId: string) {
    this.roleService.getUserRolesByUserId(userId)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe( userAccountsRoles => {
        this.roleService.manageUserAccountsRoles(userAccountsRoles);
      });
  }

  ngOnDestroy () {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
