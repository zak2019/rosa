import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs/internal/Subject";
import {takeUntil} from 'rxjs/operators';
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {AccountService} from "../../../core/services/account.service";
import {Account} from "../../../core/model/Account";
import {TeamService} from "../../../core/services/team.service";
import {Team} from "../../../core/model/Team";

@Component({
  selector: 'app-account-header',
  templateUrl: './account-header.component.html',
  styleUrls: ['./account-header.component.scss']
})
export class AccountHeaderComponent implements OnInit, OnDestroy {


  teamsList: Team[] = [];
  currentTeam: Team;
  accountId: string;
  account: Account;
  showAccountName = false;
  showAdminLink = false;
  showTeamLink = false;
  private ngUnSubscribe: Subject<void> = new Subject<void>();

  constructor(private accountService: AccountService,
              private teamService: TeamService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.router.events.subscribe(val => {
      if (val instanceof NavigationEnd && val.url) {
        this.manageLinks(val);
      }
    });
    this.accountService.currentAccountAsObs$
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe(value => {
        if (value) {
          this.accountId = value.accountId;
          this.account = value;
          this.manageLinks(this.router);
        }
      });

    this.teamService.currentTeamsAsObs$
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe(teams => {
        if (teams) {
          this.teamsList = teams;
          this.manageLinks(this.router);
        }
      });
  }


  private manageLinks(val) {
    if (val.url.indexOf('account') > -1) {
      this.showAccountName = true;
    } else {
      this.showAccountName = false;
    }

    if (val.url.indexOf('admin') > -1) {
      this.showAdminLink = true;
    } else {
      this.showAdminLink = false;
    }

    if (val.url.indexOf('team') > -1) {
      let teamId = val.url.split('/')[4];
      this.currentTeam = this.teamsList.filter(team => team.teamId === teamId)[0];
      this.showTeamLink = true;
    } else {
      this.showTeamLink = false;
    }
  }

  navigateToAccount() {
    this.router.navigate(['account', this.accountId]);
  }

  navigateToAccountAdminPage() {
    this.router.navigate(['account', this.accountId, 'admin']);
  }


  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }
}
