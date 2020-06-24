import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs/internal/Subject";
import {TokenStorageService} from "../../../../core/services/token-storage.service";


@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent implements OnInit, OnDestroy {
  username: string;
  userId: string;
  private ngUnSubscribe: Subject<void> = new Subject<void>();

  constructor(private tokenStorage: TokenStorageService) {
  }

  ngOnInit() {
    this.username = this.tokenStorage.getUser().username;
    this.userId = this.tokenStorage.getUser().userId;
  }

  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }
}
