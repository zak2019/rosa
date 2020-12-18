import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs/internal/Subject';
import {UserService} from "../../../../../core/services/user.service";
import {takeUntil} from "rxjs/operators";
import {Page} from "../../../../../core/model/pagination/page";
import {UsersAssociation} from "../../../../../core/model/UsersAssociation";
import {CustomPaginationService} from "../../../../../core/services/pagination/custom-pagination.service";
import {EventService} from "../../../../../core/services/event.service";
import {Event} from "../../../../../core/model/event";


@Component({
  selector: 'app-events-list-table',
  templateUrl: './events-list-table.component.html',
  styleUrls: ['./events-list-table.component.scss']
})
export class EventsListTableComponent implements OnInit, OnDestroy {

  page: Page<Event> = new Page();
  eventList = [];

  @Input() userId: string;
  @Input() accountId: string;
  private ngUnSubscribe: Subject<void> = new Subject<void>();

  constructor(private paginationService: CustomPaginationService,
              private eventService: EventService) {
  }

  ngOnInit() {
    this.getEventsByAccountId();
  }

  private getEventsByAccountId() {
    this.eventService.getPageEventsByAccountId(this.page.pageable, this.accountId)
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe(page => {
        this.page = page;
        console.log('page');
        console.log(page);
        page.data.sort((a, b) => {
          return <any>new Date(b.eventDate) - <any>new Date(a.eventDate);
        }).forEach(event => this.eventList.push(event));
      });
  }

  // later for the filter

  // private getEventsByAccountIdAndTeamId() {
  //   this.eventService.getPageEventsByAccountIdAndTeamId(this.page.pageable, this.accountId, this.teamId)
  //     .pipe(takeUntil(this.ngUnSubscribe))
  //     .subscribe(page => {
  //       this.page = page;
  //       page.data.sort((a, b) => {
  //         return <any>new Date(b.eventDate) - <any>new Date(a.eventDate);
  //       }).forEach(event => this.eventList.push(event));
  //     });
  // }

  rowClicked(row: any): void {
    console.log(row);
  }

  public getNextPage(): void {
    this.page.pageable = this.paginationService.getNextPage(this.page);
    this.getEventsByAccountId();
  }

  public getPreviousPage(): void {
    this.page.pageable = this.paginationService.getPreviousPage(this.page);
    this.getEventsByAccountId();
  }

  public getPageInNewSize(pageSize: number): void {
    this.page.pageable = this.paginationService.getPageInNewSize(this.page, pageSize);
    this.getEventsByAccountId();
  }

  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }
}
