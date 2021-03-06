import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs/internal/Subject";
import {EventWebsocketService} from "../../../core/services/socket/event-socket/event.websocket.service";


@Component({
  selector: 'app-account-home',
  templateUrl: './account-home.component.html',
  styleUrls: ['./account-home.component.scss']
})
export class AccountHomeComponent implements OnInit, OnDestroy {

  private ngUnSubscribe: Subject<void> = new Subject<void>();

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }
}
