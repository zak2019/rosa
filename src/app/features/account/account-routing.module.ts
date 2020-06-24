import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminComponent} from './admin/admin.component';
import {AccountComponent} from './account.component';
import {AdminGuardService} from '../../../@shared/guards/admin-guard.service';
import {AccountReportsComponent} from './admin/account-reports/account-reports.component';
import {AccountUsersManagementComponent} from "./admin/account-users-management/account-users-management.component";
import {AdminDashboardComponent} from "./admin/admin-dashboard/admin-dashboard.component";
import {AccountHomeComponent} from "./account-home/account-home.component";

const routes: Routes = [
  {path: '', component: AccountComponent, children: [
      {path: '', component: AccountHomeComponent},
      {path: 'admin', component: AdminComponent, canActivate: [AdminGuardService],
        children: [
          {path: 'dashboard', component: AdminDashboardComponent},
          {path: 'reports', component: AccountReportsComponent},
          {path: 'users-management', component: AccountUsersManagementComponent},
          {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
          {path: '**', component: AccountUsersManagementComponent}
        ]},
    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {
}
