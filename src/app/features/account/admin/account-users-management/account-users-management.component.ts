import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs/internal/Subject';
import {Chart} from '../../../../core/model/chart';
import {ActivatedRoute} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {TokenStorageService} from "../../../../core/services/token-storage.service";

@Component({
  selector: 'app-account-users-management',
  templateUrl: './account-users-management.component.html',
  styleUrls: ['./account-users-management.component.scss']
})
export class AccountUsersManagementComponent implements OnInit, OnDestroy {

  idAdmin: string;
  accountId: string;
  private ngUnSubscribe: Subject<void> = new Subject<void>();

  constructor(private route: ActivatedRoute,
              private tokenStorageService: TokenStorageService) {
  }

  ngOnInit() {
    this.idAdmin = this.tokenStorageService.getUser().userId;
    this.accountId = this.route.snapshot.parent.parent.params.accountId;
  }

  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }
}

