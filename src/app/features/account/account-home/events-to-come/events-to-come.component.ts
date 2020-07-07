import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {Subject} from "rxjs/internal/Subject";
import {takeUntil} from "rxjs/operators";
import {EventService} from "../../../../core/services/event.service";
import {Page} from "../../../../core/model/pagination/page";
import {Event} from "../../../../core/model/event";

@Component({
  selector: 'app-events-to-come',
  templateUrl: './events-to-come.component.html',
  styleUrls: ['./events-to-come.component.scss']
})
export class EventsToComeComponent implements OnInit, OnDestroy, OnChanges {

  @Input() accountId: string;
  @Input() userId: string;
  @Input() teamId: string;
  eventsToComeList;
  nextEvent;
  private ngUnSubscribe: Subject<void> = new Subject<void>();
  page: Page<Event> = new Page<Event>();

  constructor(private eventService: EventService) {
  }

  ngOnInit() {
    this.getEventsToCome();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.teamId &&
      changes.teamId.previousValue &&
      changes.teamId.previousValue != changes.teamId.currentValue) {
      this.getEventsToCome();
    }
  }

  private getEventsToCome() {
    if (this.teamId) {
      this.getEventsToComeForTeam();
    } else {
      this.getEventsToComeForProject();
    }
  }

  private getEventsToComeForProject() {
    this.eventsToComeList = [];
    this.nextEvent = null;
    this.page.pageable.pageSize = 4;
    this.eventService.getPageEventsToComeByUserIdAndAccountId(this.page.pageable, this.userId, this.accountId)
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe(page => {
        this.page = page;
        page.data.sort((a, b) => {
          return <any>new Date(a.eventDate) - <any>new Date(b.eventDate);
        }).forEach(event => this.eventsToComeList.push(event));
        this.nextEvent = this.eventsToComeList[0];
        this.eventsToComeList.splice(0, 1);
      });
  }

  private getEventsToComeForTeam() {
    this.eventsToComeList = [];
    this.nextEvent = null;
    this.page.pageable.pageSize = 4;
    this.eventService.getPageEventsToComeByUserIdAndAccountIdAndTeamId(
      this.page.pageable,
      this.userId,
      this.accountId,
      this.teamId
      )
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe(page => {
        this.page = page;
        page.data.sort((a, b) => {
          return <any>new Date(a.eventDate) - <any>new Date(b.eventDate);
        }).forEach(event => this.eventsToComeList.push(event));
        this.nextEvent = this.eventsToComeList[0];
        this.eventsToComeList.splice(0, 1);
      });
  }

  eventReached(newEvent) {
    if(this.teamId) {
      this.getEventsToComeForTeam();
    } else {
      this.getEventsToComeForProject();
    }
    this.eventService.setNewEvent(newEvent);
  }

  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }
}
