import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../core/services/user.service';
import {User} from '../../core/model/user';
import {ActivatedRoute, Router} from "@angular/router";
import {NavigationMenu} from "../../core/model/navigation-menu";
import {NavigationMenuService} from "../../core/services/navigation-menu.service";
import {Subject} from "rxjs/internal/Subject";
import {debounceTime, takeUntil} from "rxjs/operators";
import {MatSidenav} from "@angular/material/sidenav";

const userProfileMenuSectionData: NavigationMenu[] = [
  {title: 'My profile', link: 'profile', selected: false, childSection: [], icon: 'home'},
  {title: 'Notification history', link: 'notifications', selected: false, childSection: [], icon: 'settings'}
];


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, OnDestroy {
  @ViewChild('sidenav') sidenav: MatSidenav;
  userId: string;

  private ngUnSubscribe: Subject<void> = new Subject<void>();

  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private navigationMenuService: NavigationMenuService) {
  }

  ngOnInit() {
    this.navigationMenuService.setMenuSections(JSON.parse(JSON.stringify(userProfileMenuSectionData)));
    this.navigationMenuService.sideNavToggleSubjectObs$
      .pipe(takeUntil(this.ngUnSubscribe),
        debounceTime(500))
      .subscribe(() => {
        this.sidenav.toggle();
      });
  }

  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
    this.navigationMenuService.setMenuSections([]);
  }
}
