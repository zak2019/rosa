import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../core/services/auth.service';
import {TokenStorageService} from '../../core/services/token-storage.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ValidationService} from '../../core/validators/validation.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UsersAssociationService} from "../../core/services/users-association.service";
import {RoleService} from "../../core/services/role.service";

@Component({
  selector: 'app-user-verification',
  templateUrl: './user-verification.component.html',
  styleUrls: ['./user-verification.component.scss']
})
export class UserVerificationComponent implements OnInit {

  success = false;
  inProgress = true;
  errorMessage: string;
  associationId: string;
  tokenId: string;
  constructor(private route: ActivatedRoute,
              private authService: AuthService) {

  }

  ngOnInit() {
    this.associationId = this.route.snapshot.params.associationId;
    this.tokenId = this.route.snapshot.params.tokenId;
    this.authService.userVerification(this.associationId, this.tokenId).subscribe( () => {
      this.success = true;
      this.inProgress = false;
      },
      err => {
        this.success = false;
        this.inProgress = false;
        this.errorMessage = err.error.message;
      });
  }


}
