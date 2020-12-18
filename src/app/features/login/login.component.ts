import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import {TokenStorageService} from '../../core/services/token-storage.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidationService} from '../../core/validators/validation.service';
import {Router} from '@angular/router';
import {UsersAssociationService} from "../../core/services/users-association.service";
import {RoleService} from "../../core/services/role.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private usersAssociationService: UsersAssociationService,
              private router: Router,
              private roleService: RoleService) {
  }

  ngOnInit() {
    this.loginForm =  new FormGroup({
      email: new FormControl('',[
        Validators.required,
        ValidationService.emailValidator]),
      password: new FormControl('',[
        Validators.required,
        ValidationService.passwordValidator
      ])
    });
    // if (this.tokenStorage.getToken()) {
    //   this.isLoggedIn = true;
    //   this.roles = this.tokenStorage.getUser().roles;
    // }
  }

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.authService.updateUserState(true);

        this.usersAssociationService.getUsersAssociationByInvitedUserId(data.userId)
          .subscribe(value => {
            this.roleService.manageUserAccountsRoles(value);
            if(value && value.length > 1) {
              this.router.navigate(['/accounts-list']);
            } else if(value && value.length === 1) {
              let account = value[0].account;
              this.router.navigate(['/account', account.accountId]);
            }
          });
       // this.router.navigate(['/home']);
      },
      err => {
        this.errorMessage = this.manageErrorMessage(err.error.message);
        this.isLoginFailed = true;
      }
    );
  }

  private manageErrorMessage(msg: string) {
    if(msg.includes('disabled')) return 'Account Disabled or not Activated yet';
    else if (msg.includes('Bad credentials')) return 'Wrong User name or password';
    else return 'error';
  }
}
