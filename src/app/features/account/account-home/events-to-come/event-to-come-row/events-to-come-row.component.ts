import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs/internal/Subject";
import {Event} from "../../../../../core/model/event";
import {DateService} from "../../../../../core/services/util/date.service";

@Component({
  selector: 'app-events-to-come-row',
  templateUrl: './events-to-come-row.component.html',
  styleUrls: ['./events-to-come-row.component.scss']
})
export class EventsToComeRowComponent implements OnInit, OnDestroy {

  text:any = {
    Year: 'Year',
    Month: 'Month',
    Weeks: "Weeks",
    Days: "Days",
    Hours: "Hours",
    Minutes: "Minutes",
    Seconds: "Seconds",
    MilliSeconds: "MilliSeconds"
  };

  @Input() event: Event;
  timeLeft;
  countDownConfig;
  private ngUnSubscribe: Subject<void> = new Subject<void>();

  constructor(private dateService: DateService) {
  }

  ngOnInit() {
    this.timeLeft =  Math.floor(this.dateService.getTimeLeft(this.event.eventDate)/1000);
    this.countDownConfig = {leftTime: this.timeLeft, format: 'd,HH:mm:ss'};
  }
  callback(v) {}

  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }
}
