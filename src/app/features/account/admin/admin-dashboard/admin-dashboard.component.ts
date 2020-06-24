import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs/internal/Subject';
import {Chart} from '../../../../core/model/chart';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit, OnDestroy {

  accountId;

  private ngUnSubscribe: Subject<void> = new Subject<void>();

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.accountId = this.route.snapshot.parent.parent.params.accountId;
  }

  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }
}
