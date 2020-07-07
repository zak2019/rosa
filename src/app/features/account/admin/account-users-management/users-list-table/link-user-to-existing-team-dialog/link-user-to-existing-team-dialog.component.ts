import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../../../../core/services/user.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs/internal/Subject";
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER, SPACE} from "@angular/cdk/keycodes";
import {TeamService} from "../../../../../../core/services/team.service";
import {Team} from "../../../../../../core/model/Team";

@Component({
  selector: 'link-user-to-existing-team-dialog',
  templateUrl: 'link-user-to-existing-team-dialog.component.html',
  styleUrls: ['./link-user-to-existing-team-dialog.component.scss']
})
export class LinkUserToExistingTeamDialogComponent implements OnInit {

  public teamList: Team[];
  teamId: string;
  private ngUnSubscribe: Subject<void> = new Subject<void>();

  constructor(private teamService: TeamService,
              public dialogRef: MatDialogRef<LinkUserToExistingTeamDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.teamService.getTeamsByAccountId(this.data.accountId)
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe(teams => this.teamList = teams);
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  setSelectedTeam(team: Team) {
    this.teamId = team.teamId;
  }

  onAddClick(): void {
    this.teamService.linkOneUserToTeam( this.teamId, this.data.userId)
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe(team => {
        this.dialogRef.close({teamName: team.body.teamName, userName: this.data.userName});
      });
  }

  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }
}
