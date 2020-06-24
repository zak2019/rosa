import {Component, OnDestroy, OnInit} from '@angular/core';
import {TokenStorageService} from '../../core/services/token-storage.service';
import {UsersAssociationService} from "../../core/services/users-association.service";
import {takeUntil} from "rxjs/operators";
import {Subject} from "rxjs/internal/Subject";
import {UsersAssociation} from "../../core/model/UsersAssociation";
import {Router} from "@angular/router";

@Component({
  selector: 'app-accounts-list',
  templateUrl: './accounts-list.component.html',
  styleUrls: ['./accounts-list.component.scss']
})
export class AccountsListComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  username: string;
  associatedAcounts: UsersAssociation[];
  private ngUnSubscribe: Subject<void> = new Subject<void>();

  constructor( private tokenStorage: TokenStorageService,
               private usersAssociationService: UsersAssociationService,
               private router: Router) {
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.username = this.tokenStorage.getUser().username;
      this.usersAssociationService
        .getUsersAssociationByInvitedUserId(this.tokenStorage.getUser().userId)
        .pipe(takeUntil(this.ngUnSubscribe))
        .subscribe(value => {
          this.associatedAcounts = value;
        });
    }
  }
  navigateToAccount(idAccount) {
    this.router.navigate(['/account', idAccount]);
  }
  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }
}
