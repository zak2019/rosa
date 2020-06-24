import {Component, Inject, OnInit} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../../../core/services/user.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs/internal/Subject";
import {MatChipInputEvent} from "@angular/material/chips";
import {COMMA, ENTER, SPACE} from "@angular/cdk/keycodes";
import {TeamService} from "../../../../../../core/services/team.service";

@Component({
  selector: 'add-team-dialog',
  templateUrl: 'add-team-dialog.component.html',
  styleUrls: ['./add-team-dialog.component.scss']
})
export class AddTeamDialogComponent implements OnInit {


  newTeamFormGroup: FormGroup;

  private ngUnSubscribe: Subject<void> = new Subject<void>();

  constructor(private teamService: TeamService,
              public dialogRef: MatDialogRef<AddTeamDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit() {
    this.newTeamFormGroup = new FormGroup({
      teamName: new FormControl('', [
        Validators.required
      ]),
    })
  }

  onCloseClick(): void {
    this.dialogRef.close();
  }

  onAddClick(): void {
    this.teamService.createNewTeam(this.data.accountId, this.newTeamFormGroup.value)
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe(newTeam => {
        this.dialogRef.close({data: newTeam});
      });
  }

  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }

}
