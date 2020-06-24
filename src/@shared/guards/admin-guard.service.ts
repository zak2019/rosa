import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {TokenStorageService} from '../../app/core/services/token-storage.service';
import {Observable} from 'rxjs/internal/Observable';
import {RoleService} from "../../app/core/services/role.service";


@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {

  constructor(private tokenStorageService: TokenStorageService,
              private router: Router,
              private roleServie: RoleService) {
  }

  // the Router call canActivate() method,
  // if canActivate is registered in Routes[]
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const accountId = state.url.split('/')[2];

    // here we check if user is logged in or not
    if (!!this.tokenStorageService.getToken()) {
      // just return true - if user is logged in
      if(this.roleServie.isUserAdmin(this.tokenStorageService.getUserRoles(), accountId)) {
        return true;
      } else {
        this.router.navigate(['/account/', accountId]);
        return false;
      }
    }
  }
}
