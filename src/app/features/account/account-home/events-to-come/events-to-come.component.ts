import {Component, Input, OnDestroy, OnInit} from '@angular/core';
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
export class EventsToComeComponent implements OnInit, OnDestroy {
  messages: any[] = [
    {
      from: 'Nirav joshi (nbj@gmail.com)',
      image: 'assets/images/user.png',
      subject: 'Material angular',
      content: 'This is the material angular template'
    },
    {
      from: 'Sunil joshi (sbj@gmail.com)',
      image: 'assets/images/user.png',
      subject: 'Wrappixel',
      content: 'We have wrappixel launched'
    },
    {
      from: 'Vishal Bhatt (bht@gmail.com)',
      image: 'assets/images/user.png',
      subject: 'Task list',
      content: 'This is the latest task hasbeen done'
    }
  ];

  @Input() accountId: string;
  @Input() userId: string;
  eventsToComeList;
  nextEvent;
  private ngUnSubscribe: Subject<void> = new Subject<void>();
  page: Page<Event> = new Page<Event>();

  constructor(private eventService: EventService) {
  }

  ngOnInit() {
    this.getEventsToCome();
  }

  private getEventsToCome() {
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

  eventReached(newEvent) {
    console.log('event reached');
    console.log(newEvent);
    this.getEventsToCome();
    this.eventService.setNewEvent(newEvent);
  }

  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }
}
