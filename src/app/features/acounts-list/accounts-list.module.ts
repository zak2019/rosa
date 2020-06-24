import {MaterialModule} from "../../core/modules/material.module";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgModule} from "@angular/core";
import {FlexLayoutModule} from "@angular/flex-layout";
import {CommonModule} from "@angular/common";
import {AccountsListComponent} from "./accounts-list.component";

@NgModule({
  declarations: [
    AccountsListComponent
  ],
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  exports: [
    AccountsListComponent
  ]
})
export class AccountsListModule {

}
