import {Component, Input, OnInit} from "@angular/core";
import {FormArray, FormControl} from "@angular/forms";
import {map, startWith, takeUntil} from "rxjs/operators";
import {Subject} from "rxjs/internal/Subject";
import {COMMA, ENTER, SPACE} from "@angular/cdk/keycodes";
import {UsersAssociationService} from "../../../../../../core/services/users-association.service";
import {Observable} from "rxjs/internal/Observable";
import {UsersAssociation} from "../../../../../../core/model/UsersAssociation";

@Component({
  selector: 'add-users-to-event',
  templateUrl: 'add-users-to-event.component.html',
  styleUrls: ['./add-users-to-event.component.scss']
})
export class AddUsersToEventComponent implements OnInit {

  searchList: UsersAssociation[] = [];
  myControl = new FormControl();
  filteredOptions: Observable<any>;

  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes = [ENTER, COMMA, SPACE];
  associations = [];
  @Input() accountId: string;
  @Input() invitedUserDataForm: FormArray;

  private ngUnSubscribe: Subject<void> = new Subject<void>();

  constructor(private associationService: UsersAssociationService) {
  }

  ngOnInit() {
    this.associationService.getUsersAssociationByAccountId(this.accountId)
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe(associations => {
        this.searchList = associations;
      });
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value))
    );
  }

  add(association: UsersAssociation): void {
    this.myControl.setValue('');
    this.searchList = this.searchList.filter(assoc => assoc.invitedUser.email != association.invitedUser.email);
    this.associations.push(association.invitedUser.email);
    this.invitedUserDataForm.push(new FormControl(new UsersAssociation(association.associationId)));
  }

  remove(email: any): void {
    const index = this.associations.indexOf(email);
    if (index >= 0) {
      this.associations.splice(index, 1);
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
