import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserProfileComponent} from '../profile/user-profile.component';
import {UserProfileDashboardComponent} from "./user-profile-dashboard/user-profile-dashboard.component";
import {UserProfileNotificationsComponent} from "./user-profile-notifications/user-profile-notifications.component";

const routes: Routes = [
  {path: '', component: UserProfileComponent, children: [
      {path: '', component: UserProfileDashboardComponent},
      {path: 'profile', component: UserProfileDashboardComponent},
      {path: 'notifications', component: UserProfileNotificationsComponent}
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserProfileRoutingModule {
}
