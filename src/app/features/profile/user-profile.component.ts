import {Component, OnInit} from '@angular/core';
import {UserService} from '../../core/services/user.service';
import {TokenStorageService} from '../../core/services/token-storage.service';
import {User} from '../../core/model/user';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  userDetails: User;
  userId: string;

  constructor(private userService: UserService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.userId = this.route.snapshot.params.userId;
    this.getUserDetailsByUserId(this.userId);
  }

  private getUserDetailsByUserId(userId: string) {
    this.userService.getUserByUserId(userId).subscribe(
      data => {
        this.userDetails = data;
      },
      err => {
       this.router.navigate(['/home']);
      }
    );
  }
}
