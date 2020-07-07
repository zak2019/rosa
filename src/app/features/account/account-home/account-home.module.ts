import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import {MaterialModule} from '../../../core/modules/material.module';
import {RouterModule} from '@angular/router';
import {CommonModule} from "@angular/common";
import {FlexLayoutModule} from "@angular/flex-layout";
import {AccountHomeComponent} from "./account-home.component";
import {ProfileCardComponent} from "./profile-card/profile-card.component";
import {PublicationComponent} from "./publication-component/publication.component";
import {SharedModule} from "../../../shared/shared.module";
import {EventsToComeComponent} from "./events-to-come/events-to-come.component";
import {EventsToComeRowComponent} from "./events-to-come/event-to-come-row/events-to-come-row.component";
import {CountdownModule} from "../../../shared/countDown-timer/countdown.module";
import {ProjectDashboardComponent} from "./project-dashbord/project-dashboard.component";
import {TeamDashboardComponent} from "./team-dashbord/team-dashboard.component";
import {TeamsCardComponent} from "./teams-card/teams-card.component";
import {CommentDisplayComponent} from "./publication-component/comment-display/comment-display.component";

@NgModule({
  declarations: [
    AccountHomeComponent,
    ProjectDashboardComponent,
    TeamDashboardComponent,
    ProfileCardComponent,
    TeamsCardComponent,
    PublicationComponent,
    CommentDisplayComponent,
    EventsToComeComponent,
    EventsToComeRowComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    FlexLayoutModule,
    SharedModule,
    CountdownModule
  ],
  exports: [
    AccountHomeComponent
  ]
})
export class AccountHomeModule {

}
