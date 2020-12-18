import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs/internal/Subject';
import {UserService} from "../../../../../core/services/user.service";
import {takeUntil} from "rxjs/operators";
import {Page} from "../../../../../core/model/pagination/page";
import {UsersAssociation} from "../../../../../core/model/UsersAssociation";
import {CustomPaginationService} from "../../../../../core/services/pagination/custom-pagination.service";
import {Role} from "../../../../../core/model/role";
import {MatDialog} from "@angular/material/dialog";
import {AddUsersDialogComponent} from "./add-users-dialog/add-users-dialog.component";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {UsersAssociationService} from "../../../../../core/services/users-association.service";
import {ConfirmationDialogComponent} from "../../../../../shared/confirmation-dialog/confirmation-dialog.component";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {User} from "../../../../../core/model/user";
import {LinkUserToExistingTeamDialogComponent} from "./link-user-to-existing-team-dialog/link-user-to-existing-team-dialog.component";


@Component({
  selector: 'app-users-list-table',
  templateUrl: './users-list-table.component.html',
  styleUrls: ['./users-list-table.component.scss']
})
export class UsersListTableComponent implements OnInit, OnDestroy {

  page: Page<UsersAssociation> = new Page();
  @Input() userId: string;
  @Input() accountId: string;
  searchFormGroup: FormGroup;
  private ngUnSubscribe: Subject<void> = new Subject<void>();

  constructor(private userService: UserService,
              private paginationService: CustomPaginationService,
              public dialog: MatDialog,
              public snackBar: MatSnackBar,
              private usersAssociationService: UsersAssociationService) {
  }

  ngOnInit() {
    this.searchFormGroup = new FormGroup({
      inputSearch: new FormControl()
    });
    this.getData();
    this.searchFormGroup.controls['inputSearch'].valueChanges
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe( value => this.getData(value));
  }

  getData(searchStr?: string): void {
    this.userService.getUsersByAdminIdAndAccount(this.page.pageable, searchStr, this.userId, this.accountId)
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe(page => {
        this.page = page
      });
  }

  rowClicked(row: any): void {
    console.log(row);
  }

  private deleteUserAssociation(row: UsersAssociation, i) {
    this.usersAssociationService.deleteAssociation(row.associationId)
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe( () => this.page.data.splice(i, 1));
  }

  addRoleToUserAssociation(row: UsersAssociation, role) {
    this.usersAssociationService.addRoleToUserAssociation(row.associationId, role)
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe( usersAssoc => row.roles = usersAssoc.body.roles);
  }

  deleteRoleFromUserAssociation(row: UsersAssociation, role) {
    this.usersAssociationService.deleteRoleFromUserAssociation(row.associationId, role)
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe( usersAssoc => row = usersAssoc.body);
  }

  getRoleLabel(roles: Role[]) {
    return roles.map(x => {
      if (x.name === 'ROLE_USER') {
        return 'User';
      } else if (x.name === 'ROLE_ADMIN') {
        return 'Admin';
      }
    }).join(", ");
  }

  isAdmin(roles: Role[]): boolean {
    return roles.filter(x => x.name = 'ROLE_ADMIN').length > 0;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddUsersDialogComponent, {
      width: '700px',
      data: {
        accountId: this.accountId
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.data.body && result.data.body.length > 0) {
          result.data.body.forEach(data => data ? this.page.data.push(data) : '');
        }
        result.data.messageList.forEach((message, index) => {
          setTimeout(() => {
            this.openSnackBar(message, 'OK');
          }, index * 4500)
        });
      }
    });
  }

  linkUserToExistingTeam(user: UsersAssociation): void {
    const dialogRef = this.dialog.open(LinkUserToExistingTeamDialogComponent, {
      width: '700px',
      data: {
        accountId: this.accountId,
        userId: user.invitedUser.userId,
        userName: user.invitedUser.username,
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.teamName && result.userName) {
            this.openSnackBar(
              result.userName + ' linked to the team ' + result.teamName + ' successfully', 'OK');
      }
    });
  }

  confirmDeleteUser(element: UsersAssociation, index): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        dialogTitle: 'Confirm delete user',
        message: 'Are you sure you want to delete the user ',
        value: element.invitedUser.username,
        cancelLabel: 'cancel',
        confirmationLabel: 'Delete'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteUserAssociation(element, index);
      }
    });
  }

  confirmAddRoleAdmin(element: UsersAssociation, role): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        dialogTitle: 'Confirm',
        message: 'Are you sure you want to make administrator the user ',
        value: element.invitedUser.username,
        cancelLabel: 'No',
        confirmationLabel: 'Yes'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addRoleToUserAssociation(element, role)
      }
    });
  }

  confirmDeleteRoleAdmin(element: UsersAssociation, role): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        dialogTitle: 'Confirm',
        message: 'Are you sure you want to remove the role administrator from the user ',
        value: element.invitedUser.username,
        cancelLabel: 'No',
        confirmationLabel: 'Yes'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteRoleFromUserAssociation(element, role)
      }
    });
  }

  openSnackBar(message: string, action: string) {
    let config = new MatSnackBarConfig();
    config.verticalPosition = "top";
    config.horizontalPosition = "center";
    config.duration = 4000;
    // config.panelClass = result.status === 'success' ? ['snack-bar-success'] : ['snack-bar-danger'];
    this.snackBar.open(message, action, config);
  }

  public getNextPage(): void {
    this.page.pageable = this.paginationService.getNextPage(this.page);
    this.getData();
  }

  public getPreviousPage(): void {
    this.page.pageable = this.paginationService.getPreviousPage(this.page);
    this.getData();
  }

  public getPageInNewSize(pageSize: number): void {
    this.page.pageable = this.paginationService.getPageInNewSize(this.page, pageSize);
    this.getData();
  }

  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }
}
