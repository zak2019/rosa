import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs/internal/Subject';
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {Team} from "../../../../../core/model/Team";
import {TeamService} from "../../../../../core/services/team.service";
import {takeUntil} from "rxjs/operators";
import {AddUsersDialogComponent} from "../users-list-table/add-users-dialog/add-users-dialog.component";
import {AddTeamDialogComponent} from "./add-team-dialog/add-team-dialog.component";
import {LinkUsersToTeamDialogComponent} from "./link-users-to-team-dialog/link-users-to-team-dialog.component";


@Component({
  selector: 'app-groups-list-table',
  templateUrl: './groups-list-table.component.html',
  styleUrls: ['./groups-list-table.component.scss']
})
export class GroupsListTableComponent implements OnInit, OnDestroy {

  @Input() accountId: string;
  data: Team[];
  private ngUnSubscribe: Subject<void> = new Subject<void>();

  constructor(public dialog: MatDialog,
              public snackBar: MatSnackBar,
              public teamService: TeamService) {
  }

  ngOnInit() {
    this.teamService.getTeamsByAccountId(this.accountId)
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe(teams => this.data = teams);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddTeamDialogComponent, {
      width: '700px',
      data: {
        accountId: this.accountId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.data.body) {
        this.data.push(result.data.body);
        this.openSnackBar(result.data.message, 'OK');
      }
    });
  }

  openLinkUsersToTeamDialog(team: Team, index): void {
    const dialogRef = this.dialog.open(LinkUsersToTeamDialogComponent, {
      width: '700px',
      data: {
        accountId: this.accountId,
        team: team
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.data.body) {
        this.data[index] = result.data.body;
        this.openSnackBar(result.data.message, 'OK');
      }
    });
  }

  rowClicked(row: any) {
    console.log(row);
  }

  // confirmAddRoleAdmin(element: UsersAssociation, role): void {
  //   const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
  //     data: {
  //       dialogTitle: 'Confirm',
  //       message: 'Are you sure you want to make administrator the user ',
  //       value: element.invitedUser.username,
  //       cancelLabel: 'No',
  //       confirmationLabel: 'Yes'
  //     }
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     if (result) {
  //       this.addRoleToUserAssociation(element, role)
  //     }
  //   });
  // }


  openSnackBar(message: string, action: string) {
    let config = new MatSnackBarConfig();
    config.verticalPosition = "top";
    config.horizontalPosition = "center";
    config.duration = 4000;
    // config.panelClass = result.status === 'success' ? ['snack-bar-success'] : ['snack-bar-danger'];
    this.snackBar.open(message, action, config);
  }


  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }
}
