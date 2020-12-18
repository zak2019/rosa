import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidationService} from '../../core/validators/validation.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersAssociationService} from "../../core/services/users-association.service";
import {UserService} from "../../core/services/user.service";
import {UsersAssociation} from "../../core/model/UsersAssociation";

@Component({
  selector: 'app-complete-registration',
  templateUrl: './complete-registration.component.html',
  styleUrls: ['./complete-registration.component.scss']
})
export class CompleteRegistrationComponent implements OnInit {

  completeRegistrationForm: FormGroup;
  associationId: string;
  associationData: UsersAssociation;


  constructor(private userService: UserService,
              private usersAssociationService: UsersAssociationService,
              private route: ActivatedRoute,
              private router: Router) {
  }

  ngOnInit() {
    this.associationId = this.route.snapshot.params.associationId;
    this.usersAssociationService.getUsersAssociationByAssociationId(this.associationId)
      .subscribe(assoc => {
        if(assoc == null || (assoc != null && assoc.enabled))  this.router.navigate(['/login']);
        this.associationData = assoc;
    });
    this.completeRegistrationForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3)]),
      password: new FormControl('', [
        Validators.required,
        ValidationService.passwordValidator
      ])
    });
  }

  onSubmit() {
    this.userService.completeUserRegistration(this.associationId, this.completeRegistrationForm.value)
      .subscribe(() => {
        this.router.navigate(['/login']);
      },
      err => {
      }
    );
  }

}
