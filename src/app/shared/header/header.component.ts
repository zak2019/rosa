import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs/internal/Subject";
import {TokenStorageService} from '../../core/services/token-storage.service';
import {AuthService} from '../../core/services/auth.service';
import {takeUntil} from 'rxjs/operators';
import {NavigationMenuService} from '../../core/services/navigation-menu.service';
import {MatSidenav} from '@angular/material/sidenav';
import {NavigationEnd, Router} from "@angular/router";
import {RoleService} from "../../core/services/role.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Input() sidenav: MatSidenav;
  private roles: string[];
  isLoggedIn = false;
  showAdminBoard = false;
  username: string;
  userId: string;
  accountId: string;
  hideMenuIcon = false;
  private ngUnSubscribe: Subject<void> = new Subject<void>();

  constructor(private tokenStorageService: TokenStorageService,
              private authService: AuthService,
              private navigationMenuService: NavigationMenuService,
              private router: Router,
              private roleServie: RoleService) {
  }

  ngOnInit() {
    this.navigationMenuService.menuSectionsObs$
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe( menuData => {
        if(menuData && menuData.length > 0) {
          this.hideMenuIcon = false;
        } else {
          this.hideMenuIcon = true;
        }
      });

    this.authService.userStateAsObs$
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe( value => {
        this.isLoggedIn = value;
        if (value) {
          const user = this.tokenStorageService.getUser();
          this.username = user.username;
          this.userId = user.userId;
        }
      });

    this.router.events.subscribe(val => {
      if(val instanceof NavigationEnd && val.url && val.url.indexOf('account/') > -1) {
        this.showAdminBoard = false;
        this.accountId = val.url.split('/')[2];
        this.showAdminBoard =
          this.roleServie.isUserAdmin(this.tokenStorageService.getUserRoles(), this.accountId);
      }
    });
  }

  // private isUserAdmin(userAccountRoles, accountId) {
  //   this.showAdminBoard = false;
  //   userAccountRoles.forEach(assoc => {
  //     if (assoc.account === accountId) {
  //       assoc.roles.forEach(role => {
  //         if (role.name === 'ROLE_ADMIN') {
  //           this.showAdminBoard = true;
  //         }
  //       })
  //     }
  //   });
  // }
  navigateToAdminPage() {
    this.router.navigate([' http://localhost:4200/account', this.userId,'/admin']);
  }

  logout() {
    this.authService.updateUserState(true);
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  toggleMenu() {
    this.navigationMenuService.toggle();
  }

  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }
}
