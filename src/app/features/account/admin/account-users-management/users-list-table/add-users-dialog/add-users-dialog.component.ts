import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UserService} from "../../../../../../core/services/user.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs/internal/Subject";
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER, SPACE} from "@angular/cdk/keycodes";

@Component({
  selector: 'add-users-dialog',
  templateUrl: 'add-users-dialog.component.html',
  styleUrls: ['./add-users-dialog.component.scss']
})
export class AddUsersDialogComponent implements OnInit {

  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes = [ENTER, COMMA, SPACE];
  emails = [];

  private ngUnSubscribe: Subject<void> = new Subject<void>();

  constructor(private userService: UserService,
              public dialogRef: MatDialogRef<AddUsersDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {}

  onCloseClick(): void {
    this.dialogRef.close();
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.emails.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  remove(email: any): void {
    const index = this.emails.indexOf(email);

    if (index >= 0) {
      this.emails.splice(index, 1);
    }
  }

  onAddClick(): void {
    this.userService.inviteNewUsers(this.emails.join(';'), this.data.accountId)
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe(newUsers => {
        this.dialogRef.close({data: newUsers});
      });
  }

  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }

}
