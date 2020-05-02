import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import {TokenStorageService} from '../../core/services/token-storage.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidationService} from '../../core/validators/validation.service';
import {Router} from '@angular/router';

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
              private router: Router) {
  }

  ngOnInit() {
    this.loginForm =  new FormGroup({
      username: new FormControl('',[
        Validators.required,
        Validators.minLength(3)]),
      password: new FormControl('',[
        Validators.required,
        ValidationService.passwordValidator
      ])
    });
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit() {
    this.authService.login(this.loginForm.value).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.authService.updateUserState(true);
        this.router.navigate(['/home']);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }
}
