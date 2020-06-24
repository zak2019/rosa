import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TokenStorageService} from '../../../core/services/token-storage.service';
import {NavigationMenuService} from '../../../core/services/navigation-menu.service';
import {NavigationMenu} from '../../../core/model/navigation-menu';
import {Subject} from "rxjs/internal/Subject";
import {debounceTime, takeUntil} from "rxjs/operators";
import {MatSidenav} from "@angular/material/sidenav";

const adminMenuSectionData: NavigationMenu[] = [
  {title: 'Dashboard', link: 'dashboard', selected: false, childSection: [], icon: 'home'},
  {title: 'User management', link: 'users-management', selected: false, childSection: [], icon: 'settings'},
  {title: 'Reports', link: 'reports', selected: false, childSection: [], icon: 'equalizer'}
];

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav: MatSidenav;
  username: string;
  userId: string;

  private ngUnSubscribe: Subject<void> = new Subject<void>();

  constructor(private tokenStorage: TokenStorageService,
              private navigationMenuService: NavigationMenuService) {
  }

  ngOnInit() {
    this.navigationMenuService.setMenuSections(JSON.parse(JSON.stringify(adminMenuSectionData)));
    this.navigationMenuService.sideNavToggleSubjectObs$
      .pipe(takeUntil(this.ngUnSubscribe),
        debounceTime(500))
      .subscribe(() => {
        this.sidenav.toggle();
      });
    this.username = this.tokenStorage.getUser().username;
    this.userId = this.tokenStorage.getUser().userId;
  }

  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
    this.navigationMenuService.setMenuSections([]);
  }
}
