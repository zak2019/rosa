import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs/internal/Subject";
import {TokenStorageService} from '../../../core/services/token-storage.service';
import {AuthService} from '../../../core/services/auth.service';
import {takeUntil} from 'rxjs/operators';
import {NavigationMenuService} from '../../../core/services/navigation-menu.service';
import {MatSidenav} from '@angular/material/sidenav';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {RoleService} from "../../../core/services/role.service";
import {AccountService} from "../../../core/services/account.service";
import {Account} from "../../../core/model/Account";

@Component({
  selector: 'app-account-header',
  templateUrl: './account-header.component.html',
  styleUrls: ['./account-header.component.scss']
})
export class AccountHeaderComponent implements OnInit, OnDestroy {



  accountId: string;
  account: Account;
  showAccountName = false;
  showAdminLink = false;
  private ngUnSubscribe: Subject<void> = new Subject<void>();

  constructor(private accountService: AccountService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd && val.url) {
        this.manageLinks(val);
      }
    });
    this.accountService.currentAccountAsObs$
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe(value => {
        if(value) {
          this.accountId = value.accountId;
          this.account = value;
          this.manageLinks(this.router);
        }
      });
  }


  private manageLinks(val) {
    if (val.url.indexOf('account') > -1) {
      this.showAccountName = true;
    } else {
      this.showAccountName = false;
    }

    if (val.url.indexOf('admin') > -1) {
      this.showAdminLink = true;
    } else {
      this.showAdminLink = false;
    }
  }

  navigateToAccount() {
    this.router.navigate(['account', this.accountId]);
  }

  navigateToAccountAdminPage() {
    this.router.navigate(['account', this.accountId,'admin']);
  }


  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }
}
