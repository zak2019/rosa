import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {NgModule} from "@angular/core";
import {MaterialModule} from "../../core/modules/material.module";
import {UserProfileComponent} from "./user-profile.component";
import {UserProfileRoutingModule} from "./user-profile-routing.module";
import {UserProfileDashboardComponent} from "./user-profile-dashboard/user-profile-dashboard.component";
import {NavigationMenuModule} from "../../shared/navigation-menu/navigation-menu.module";
import {SharedModule} from "../../shared/shared.module";
import {UserProfileNotificationsComponent} from "./user-profile-notifications/user-profile-notifications.component";
import {FlexLayoutModule} from "@angular/flex-layout";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {MatDialogModule} from "@angular/material/dialog";

@NgModule({
  declarations: [
    UserProfileComponent,
    UserProfileDashboardComponent,
    UserProfileNotificationsComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    MaterialModule,
    SharedModule,
    ReactiveFormsModule,
    NavigationMenuModule,
    FlexLayoutModule,
    UserProfileRoutingModule,
    RouterModule,
    MatDialogModule
  ],
  exports: [
    UserProfileComponent
  ]
})
export class UserProfileModule {}
