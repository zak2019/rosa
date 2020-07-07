import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs/internal/Subject";
import {TokenStorageService} from "../../../../core/services/token-storage.service";
import {takeUntil} from "rxjs/operators";
import {TeamService} from "../../../../core/services/team.service";
import {Team} from "../../../../core/model/Team";
import {Account} from "../../../../core/model/Account";


@Component({
  selector: 'app-teams-card',
  templateUrl: './teams-card.component.html',
  styleUrls: ['./teams-card.component.scss']
})
export class TeamsCardComponent implements OnInit, OnDestroy {

  @Input() account: Account;
  teamList: Team[];
  private ngUnSubscribe: Subject<void> = new Subject<void>();

  constructor(private teamService: TeamService) {
  }

  ngOnInit() {
    this.teamService.getTeamsByAccountId(this.account.accountId)
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe(teams => {
        this.teamList = teams;
        this.teamService.setCurrentTeams(teams);
      });
  }

  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }
}
