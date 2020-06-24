import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../../../core/services/user.service";
import {map, startWith, takeUntil} from "rxjs/operators";
import {Subject} from "rxjs/internal/Subject";
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER, SPACE} from "@angular/cdk/keycodes";
import {TeamService} from "../../../../../../core/services/team.service";
import {Observable} from "rxjs/internal/Observable";
import {UsersAssociation} from "../../../../../../core/model/UsersAssociation";
import {UsersAssociationService} from "../../../../../../core/services/users-association.service";
import {Team} from "../../../../../../core/model/Team";
import {User} from "../../../../../../core/model/user";

@Component({
  selector: 'link-users-to-team-dialog',
  templateUrl: 'link-users-to-team-dialog.component.html',
  styleUrls: ['./link-users-to-team-dialog.component.scss']
})
export class LinkUsersToTeamDialogComponent implements OnInit {

  searchList: UsersAssociation[] = [];
  myControl = new FormControl();
  filteredOptions: Observable<any>;
  selectable = true;
  removable = true;
  currentTeam: Team;
  associations = [];
  linkedUsers = [];

  private ngUnSubscribe: Subject<void> = new Subject<void>();

  constructor(private teamService: TeamService,
              private associationService: UsersAssociationService,
              public dialogRef: MatDialogRef<LinkUsersToTeamDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.currentTeam = new Team(this.data.team.teamId);
    this.associationService.getUsersAssociationByAccountId(this.data.accountId)
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe(associations => {
        this.searchList = associations;
        this.data.team.linkedUsers.forEach(link => {
          this.searchList = this.searchList.filter(item => item.invitedUser.email != link.email);
        });
      });
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value))
    );
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  onAddClick(): void {
    this.linkedUsers.forEach(link => this.currentTeam.linkedUsers.push(link));
    this.teamService.linkUsersToTeam(this.currentTeam)
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe(savedTeam => {
        this.dialogRef.close({data: savedTeam});
      });
  }

  add(association: UsersAssociation): void {
    this.myControl.setValue('');
    this.searchList = this.searchList.filter(assoc => assoc.invitedUser.email != association.invitedUser.email);
    this.associations.push(association.invitedUser.email);
    this.linkedUsers.push(new User(association.invitedUser.userId));
  }

  remove(email: any): void {
    const index = this.associations.indexOf(email);
    if (index >= 0) {
      this.associations.splice(index, 1);
      this.linkedUsers.splice(index, 1);
    }
  }

  private filter(value: string) {
    if (value) {
      const filterValue = value.toLowerCase();
      return this.searchList
        .filter(option => option.invitedUser.username.toLowerCase().indexOf(filterValue) > -1 || option.invitedUser.email.toLowerCase().indexOf(filterValue) > -1);
    }
  }

  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }

}
