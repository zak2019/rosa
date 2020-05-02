import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../core/services/token-storage.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  content: string;
  roles = [];
  username: string;

  constructor( private tokenStorage: TokenStorageService) {
  }

  ngOnInit() {
      this.roles = this.tokenStorage.getUser().roles;
      this.username = this.tokenStorage.getUser().username;
    }
}
