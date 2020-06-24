import {ModuleWithProviders, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {LoginComponent} from './features/login/login.component';
import {RegisterComponent} from './features/register/register.component';
import {authInterceptorProviders} from './core/interceptors/auth.interceptor';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './core/modules/material.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {AccountModule} from './features/account/account.module';
import {HeaderModule} from './shared/header/header.module';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from "@angular/common";
import {SharedModule} from "./shared/shared.module";
import {UserProfileModule} from "./features/profile/user-profile.module";
import {FlexLayoutModule} from "@angular/flex-layout";
import {AccountsListModule} from "./features/acounts-list/accounts-list.module";
import {ErrorPageComponent} from "./features/error-page/error-page.component";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ErrorPageComponent,
  ],
  imports: [
    FlexLayoutModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    AccountModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    HeaderModule,
    SharedModule,
    UserProfileModule,
    AccountsListModule,
    AppRoutingModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {

}
