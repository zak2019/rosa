import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';

import {RegisterComponent} from './features/register/register.component';
import {LoginComponent} from './features/login/login.component';
import {AccountsListComponent} from "./features/acounts-list/accounts-list.component";
import {ErrorPageComponent} from "./features/error-page/error-page.component";
import {AuthGuardService} from "../@shared/guards/auth-guard.service";
import {NotAuthGuardService} from "../@shared/guards/not-auth-guard.service";
import {UserVerificationComponent} from "./features/user-verification/user-verification.component";
import {CompleteRegistrationComponent} from "./features/complete-registration/complete-registration.component";

const routes: Routes = [
  {path: '', component: AccountsListComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent, canActivate: [NotAuthGuardService]},
  {path: 'user-verification/:associationId/:tokenId', component: UserVerificationComponent, canActivate: [NotAuthGuardService]},
  {path: 'register', component: RegisterComponent, canActivate: [NotAuthGuardService]},
  {path: 'complete-registration/:associationId',
    component: CompleteRegistrationComponent, canActivate: [NotAuthGuardService]},
  {path: 'accounts-list', component: AccountsListComponent, canActivate: [AuthGuardService]},
  {
    path: 'account/:accountId',
    loadChildren: './features/account/account.module#AccountModule', data: {preload: true},
    canActivate: [AuthGuardService]
  },
  {
    path: 'profile/:userId',
    loadChildren: './features/profile/user-profile.module#UserProfileModule', data: {preload: true},
    canActivate: [AuthGuardService]
  },
  {path: '**', component: ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      preloadingStrategy: PreloadAllModules
    })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
