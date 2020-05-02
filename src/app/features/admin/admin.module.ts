import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {AdminComponent} from './admin.component';
import {HttpClientModule} from '@angular/common/http';
import {MaterialModule} from '../../core/modules/material.module';
import {BrowserModule} from '@angular/platform-browser';

@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: []
})
export class AdminModule {

}
