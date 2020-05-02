import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {RegisterComponent} from './features/register/register.component';
import {LoginComponent} from './features/login/login.component';
import {HomeComponent} from './features/home/home.component';
import {UserProfileComponent} from './features/profile/user-profile.component';
import {AuthGuardService} from '../@shared/guards/auth-guard.service';
import {NotAuthGuardService} from '../@shared/guards/not-auth-guard.service';
import {AdminGuardService} from '../@shared/guards/admin-guard.service';
import {AdminComponent} from './features/admin/admin.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent, canActivate: [NotAuthGuardService]},
  {path: 'register', component: RegisterComponent, canActivate: [NotAuthGuardService]},
  {path: 'profile/:username', component: UserProfileComponent, canActivate: [AuthGuardService]},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuardService, AdminGuardService]},
  {path: '**', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
