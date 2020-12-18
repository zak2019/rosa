import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs/internal/Subject";
import {User} from "../../../../core/model/user";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../../core/services/user.service";
import {TokenStorageService} from "../../../../core/services/token-storage.service";

@Component({
  selector: 'app-user-profile-informations',
  templateUrl: './user-profile-informations.component.html',
  styleUrls: ['./user-profile-informations.component.scss']
})
export class UserProfileInformationsComponent implements OnInit, OnDestroy {

  @Input() user: User;
  @Input() isConnectedUser: boolean;
  editUserName = false;
  editPassword = false;
  editUserNameForm: FormGroup;
  editPasswordForm: FormGroup;
  private ngUnSubscribe: Subject<void> = new Subject<void>();

  constructor(private userService: UserService,
              private tokenStorageService: TokenStorageService) {
  }

  ngOnInit() {
  }


  buildUserNameForm() {
    this.editUserNameForm = new FormGroup({
      userName:  new FormControl (
        '',
          [Validators.required, Validators.minLength(3)])
    });
  }

  buildPasswordForm() {
    this.editPasswordForm = new FormGroup({
      password:  new FormControl (
        ['',
          [Validators.required, Validators.minLength(3)]])
    });
  }

  updateUser() {

    if (this.editUserNameForm != null) {

      this.user.username = this.editUserNameForm.value.userName;
      this.editUserNameForm = null;
    }


    this.userService.updateUser(this.user)
      .subscribe(
        updatedUser => {
          console.log(updatedUser.message);
          this.tokenStorageService.updateUserName(updatedUser.body);

        }, err => {
          console.log(err);
        }
      );
  }

    collapse() {
    this.editUserName = false;
    this.editPassword = false;
  }


  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }
}
