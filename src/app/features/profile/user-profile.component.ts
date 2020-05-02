import {Component, OnInit} from '@angular/core';
import {UserService} from '../../core/services/user.service';
import {TokenStorageService} from '../../core/services/token-storage.service';
import {User} from '../../core/model/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  content: User;

  constructor(private userService: UserService, private tokenStorage: TokenStorageService) {
  }

  ngOnInit() {
    if (this.tokenStorage.getToken()) {
      this.getUserDetails(this.tokenStorage.getUser().username);
    }
  }

  private getUserDetails(userName: string) {
    this.userService.getUserByUserName(userName).subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }
}
