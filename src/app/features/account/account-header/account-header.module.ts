import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {MaterialModule} from '../../../core/modules/material.module';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {AccountHeaderComponent} from "./account-header.component";

@NgModule({
  declarations: [
    AccountHeaderComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    AccountHeaderComponent
  ]
})
export class AccountHeaderModule {

}
