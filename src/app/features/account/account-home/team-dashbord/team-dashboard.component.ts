import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs/internal/Subject";
import {AccountService} from "../../../../core/services/account.service";
import {takeUntil} from "rxjs/operators";
import {Account} from "../../../../core/model/Account";
import {EventService} from "../../../../core/services/event.service";
import {Page} from "../../../../core/model/pagination/page";
import {CustomPaginationService} from "../../../../core/services/pagination/custom-pagination.service";
import {TokenStorageService} from "../../../../core/services/token-storage.service";
import {Event} from "../../../../core/model/event";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";


@Component({
  selector: 'app-team-dashboard',
  templateUrl: './team-dashboard.component.html',
  styleUrls: ['./team-dashboard.component.scss']
})
export class TeamDashboardComponent implements OnInit, OnDestroy {

  page: Page<Event> = new Page();
  eventList = [];
  account: Account;
  accountId;
  userId;
  teamId;
  private ngUnSubscribe: Subject<void> = new Subject<void>();

  constructor(private accountService: AccountService,
              private eventService: EventService,
              private paginationService: CustomPaginationService,
              private tokenStorageService: TokenStorageService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.userId = this.tokenStorageService.getUser().userId;
    this.teamId = this.route.snapshot.params.teamId;

    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd && val.url) {
        this.userId = this.tokenStorageService.getUser().userId;
        this.teamId = this.route.snapshot.params.teamId;
        this.getEvents();
      }
    });

    this.accountService.currentAccountAsObs$
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe(value => {
        if(value) {
          this.accountId = value.accountId;
          this.account = value;
          this.getEvents();
        }
      });

    this.eventService.newEventAsObs$
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe( newEvent => {
        if(newEvent) {
          this.eventList.unshift(newEvent);
        }
      })
  }

  private getEvents() {
    this.eventList = [];
    this.eventService.getPageEventsByUserIdAndAccountIdAndTeamId(
      this.page.pageable,
      this.userId,
      this.accountId,
      this.teamId)
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe(page => {
        this.page = page;
        page.data.sort((a, b) => {
          return <any>new Date(b.eventDate) - <any>new Date(a.eventDate);
        }).forEach(event => this.eventList.push(event));
      });
  }

  public getMoreEvents(): void {
    if (!this.page.last) {
      this.page.pageable = this.paginationService.getNextPage(this.page);
      this.getEvents();
    }
  }

  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }
}
