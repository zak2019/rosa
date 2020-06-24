import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ValidationService} from '../../core/validators/validation.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  isLinear = true;
  userDataForm: FormGroup;
  accountDataForm: FormGroup;


  form: any = {};
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    this.prepareUserDataFormGroup();
    this.prepareAccountDataFormGroup();
  }

  private prepareUserDataFormGroup() {
    this.userDataForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
      email: new FormControl('', [
        Validators.required,
        ValidationService.emailValidator
      ]),
      password: new FormControl('', [
        Validators.required,
        ValidationService.passwordValidator
      ]),
      role: new FormControl(['admin'])
    });
  }

  private prepareAccountDataFormGroup() {
    this.accountDataForm = new FormGroup({
      accountName: new FormControl('', [
        Validators.required,
        Validators.minLength(3)
      ]),
    });
  }

  onSubmit() {
    const registerData = {
      user: this.userDataForm.value,
      account: this.accountDataForm.value
    };
    this.authService.register(registerData).subscribe(
      data => {
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        this.router.navigate(['/login']);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
