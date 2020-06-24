import {Component, Inject, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NavigationMenuService} from "../../core/services/navigation-menu.service";
import {debounceTime, takeUntil} from "rxjs/operators";
import {NavigationMenu} from "../../core/model/navigation-menu";
import {Subject} from "rxjs/internal/Subject";
import {MatSidenav} from "@angular/material/sidenav";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.scss']
})
export class NavigationMenuComponent implements OnInit, OnDestroy {

  menuSections: NavigationMenu[];
  private ngUnSubscribe: Subject<void> = new Subject<void>();

  constructor(private navigationMenuService: NavigationMenuService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.navigationMenuService.menuSectionsObs$.pipe(
      takeUntil(this.ngUnSubscribe),
      debounceTime(500)
    ).subscribe(response => {
      this.menuSections = response;
    });
  }

  // navigateTo(link){
  //   this.router.navigate([link], { relativeTo: this.route })
  // }

  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }
}
