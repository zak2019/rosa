import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import {TokenStorageService} from '../../core/services/token-storage.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidationService} from '../../core/validators/validation.service';
import {Router} from '@angular/router';
import {UsersAssociationService} from "../../core/services/users-association.service";

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

}
