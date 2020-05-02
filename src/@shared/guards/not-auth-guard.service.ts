import {Injectable} from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {TokenStorageService} from '../../app/core/services/token-storage.service';
import {Observable} from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class NotAuthGuardService implements CanActivate {

  constructor(private tokenStorageService: TokenStorageService, private router: Router) {
  }

  // the Router call canActivate() method,
  // if canActivate is registered in Routes[]
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // here we check if user is logged in or not
    if (!!this.tokenStorageService.getToken()) {
      // just return false - if user is logged in
      this.router.navigate(['/home']);
      return false;
    } else {
      // just return false - if user is not logged in
      return true;
    }
  }
}
