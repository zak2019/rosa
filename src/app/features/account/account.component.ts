import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs/internal/Subject';
import {ActivatedRoute} from "@angular/router";
import {takeUntil} from "rxjs/operators";
import {AccountService} from "../../core/services/account.service";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy {

  accountId: string;
  private ngUnSubscribe: Subject<void> = new Subject<void>();

  constructor( private route: ActivatedRoute,
               private  accountService: AccountService) {
  }

  ngOnInit() {
    this.accountId = this.route.snapshot.params.accountId;
    this.accountService.getAccountByAccountId(this.accountId)
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe(value => {
        this.accountService.setCurrentAccount(value);
      });
    console.log('this.route.snapshot');
    console.log(this.route.snapshot);
  }


  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }
}
