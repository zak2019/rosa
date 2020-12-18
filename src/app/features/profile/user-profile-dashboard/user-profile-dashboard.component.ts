import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Subject} from "rxjs/internal/Subject";
import {User} from "../../../core/model/user";
import {UserService} from "../../../core/services/user.service";
import {takeUntil} from "rxjs/operators";
import {UsersAssociationService} from "../../../core/services/users-association.service";
import {UsersAssociation} from "../../../core/model/UsersAssociation";
import {TokenStorageService} from "../../../core/services/token-storage.service";

@Component({
  selector: 'app-user-profile-dashboard',
  templateUrl: './user-profile-dashboard.component.html',
  styleUrls: ['./user-profile-dashboard.component.scss']
})
export class UserProfileDashboardComponent implements OnInit, OnDestroy {
  userDetails: User;
  userId: string;
  associatedAcounts: UsersAssociation[];
  isConnectedUser = false;

  private ngUnSubscribe: Subject<void> = new Subject<void>();

  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute,
              private usersAssociationService: UsersAssociationService,
              private tokenStorageService: TokenStorageService) {
  }

  ngOnInit() {
    this.userId = this.route.snapshot.parent.params.userId;
    this.isConnectedUser = this.tokenStorageService.isThisConnectedUser(this.userId);
    this.getUserDetailsByUserId(this.userId);
    this.usersAssociationService
      .getUsersAssociationByInvitedUserId(this.userId)
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe(value => {
        this.associatedAcounts = value;
      });
  }

  navigateToAccount(idAccount) {
    this.router.navigate(['/account', idAccount]);
  }

  private getUserDetailsByUserId(userId: string) {
    this.userService.getUserByUserId(userId).subscribe(
      data => {
        this.userDetails = data;
      },
      err => {
       // this.router.navigate(['/home']);
      }
    );
  }

  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }
}
