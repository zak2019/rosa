import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs/internal/Subject";
import {AccountService} from "../../../core/services/account.service";
import {takeUntil} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {Account} from "../../../core/model/Account";
import {EventService} from "../../../core/services/event.service";
import {Page} from "../../../core/model/pagination/page";
import {CustomPaginationService} from "../../../core/services/pagination/custom-pagination.service";
import {TokenStorageService} from "../../../core/services/token-storage.service";
import {Event} from "../../../core/model/event";


@Component({
  selector: 'app-account-home',
  templateUrl: './account-home.component.html',
  styleUrls: ['./account-home.component.scss']
})
export class AccountHomeComponent implements OnInit, OnDestroy {

  page: Page<Event> = new Page();
  eventList = [];

  account: Account;
  accountId;
  userId;
  private ngUnSubscribe: Subject<void> = new Subject<void>();

  constructor(private accountService: AccountService,
              private eventService: EventService,
              private paginationService: CustomPaginationService,
              private tokenStorageService: TokenStorageService) {
  }

  ngOnInit() {
    this.userId = this.tokenStorageService.getUser().userId;
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
    this.eventService.getPageEventsByUserIdAndAccountId(this.page.pageable, this.userId, this.accountId)
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
