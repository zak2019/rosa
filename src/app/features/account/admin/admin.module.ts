import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {ChartistModule} from 'ng-chartist';
import {MaterialModule} from '../../../core/modules/material.module';
import {AccountReportsComponent} from './account-reports/account-reports.component';
import {AdminComponent} from './admin.component';
import {AccountUsersManagementComponent} from './account-users-management/account-users-management.component';
import {RouterModule} from '@angular/router';
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";
import {UsersListTableComponent} from "./account-users-management/users-list-table/users-list-table.component";
import {CommonModule} from "@angular/common";
import {CustomPaginationComponent} from "../../../shared/paginationShared/custom-pagination/custom-pagination.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {AddUsersDialogComponent} from "./account-users-management/users-list-table/add-users-dialog/add-users-dialog.component";
import {MatDialogModule} from "@angular/material/dialog";
import {NavigationMenuModule} from "../../../shared/navigation-menu/navigation-menu.module";
import {SharedModule} from "../../../shared/shared.module";
import {CreateEventComponent} from "./admin-dashboard/create-event-component/create-event.component";
import {AddUsersToEventComponent} from "./admin-dashboard/create-event-component/add-users-to-event-component/add-users-to-event.component";
import {GroupsListTableComponent} from "./account-users-management/groups-list-table/groups-list-table.component";
import {AddTeamDialogComponent} from "./account-users-management/groups-list-table/add-team-dialog/add-team-dialog.component";
import {LinkUsersToTeamDialogComponent} from "./account-users-management/groups-list-table/link-users-to-team-dialog/link-users-to-team-dialog.component";
import {LinkUserToExistingTeamDialogComponent} from "./account-users-management/users-list-table/link-user-to-existing-team-dialog/link-user-to-existing-team-dialog.component";
import {MultiSelectDatePickerModule} from "../../../shared/multiSelectDatePicker/multi-select-date-picker.module";

@NgModule({
  declarations: [
    AdminComponent,
    AccountReportsComponent,
    AccountUsersManagementComponent,
    AdminDashboardComponent,
    UsersListTableComponent,
    GroupsListTableComponent,
    CustomPaginationComponent,
    AddUsersDialogComponent,
    AddTeamDialogComponent,
    LinkUsersToTeamDialogComponent,
    LinkUserToExistingTeamDialogComponent,
    CreateEventComponent,
    AddUsersToEventComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    ChartistModule,
    RouterModule,
    FlexLayoutModule,
    NavigationMenuModule,
    MultiSelectDatePickerModule,
    MatDialogModule,
  ],
  exports: [
    AdminComponent
  ]
})
export class AdminModule {

}
