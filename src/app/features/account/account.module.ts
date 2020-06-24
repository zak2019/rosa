import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {MaterialModule} from '../../core/modules/material.module';
import {AccountComponent} from './account.component';
import {HttpClientModule} from '@angular/common/http';
import {AdminModule} from './admin/admin.module';
import {AccountRoutingModule} from "./account-routing.module";
import {SharedModule} from "../../shared/shared.module";
import {AccountHomeModule} from "./account-home/account-home.module";
import {CommonModule} from "@angular/common";
import {AccountHeaderModule} from "./account-header/account-header.module";

@NgModule({
  declarations: [
    AccountComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
    AdminModule,
    AccountHomeModule,
    SharedModule,
    AccountHeaderModule,
    AccountRoutingModule,
  ],
  exports: [
    AccountComponent
  ]
})
export class AccountModule {

}
