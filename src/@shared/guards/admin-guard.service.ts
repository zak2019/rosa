import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {TokenStorageService} from '../../app/core/services/token-storage.service';
import {Observable} from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {

  constructor(private tokenStorageService: TokenStorageService, private router: Router) {
  }

  // the Router call canActivate() method,
  // if canActivate is registered in Routes[]
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // here we check if user is logged in or not
    if (!!this.tokenStorageService.getToken()) {
      // just return true - if user is logged in
      const roles = this.tokenStorageService.getUser().roles;
      if(roles.indexOf('ROLE_ADMIN') > -1) {
        return true;
      } else {
        this.router.navigate(['/home']);
        return false;
      }
    }
  }
}
