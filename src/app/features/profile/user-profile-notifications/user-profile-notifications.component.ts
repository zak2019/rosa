import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs/internal/Subject";

@Component({
  selector: 'app-user-profile-notifications',
  templateUrl: './user-profile-notifications.component.html',
  styleUrls: ['./user-profile-notifications.component.scss']
})
export class UserProfileNotificationsComponent implements OnInit, OnDestroy {


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
