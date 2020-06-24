import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs/internal/Subject";
import {Event} from "../../../../core/model/event";
import {DateService} from "../../../../core/services/util/date.service";


@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.scss']
})
export class PublicationComponent implements OnInit, OnDestroy {

  @Input() event: Event;
  dateDifferenceLabel: string;
  private ngUnSubscribe: Subject<void> = new Subject<void>();

  constructor(private dateService: DateService) {
  }

  ngOnInit() {
    this.dateDifference();
  }

  dateDifference(){
    this.dateDifferenceLabel =
      this.dateService.dateDiff(this.event.eventDate) + ' ' + this.dateService.dateLabel(this.event.eventDate) + ' ago';
  }

  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }
}
