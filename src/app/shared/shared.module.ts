import {NgModule} from '@angular/core';
import {SpinnerComponent} from "./spinner.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ConfirmationDialogComponent} from "./confirmation-dialog/confirmation-dialog.component";
import {MaterialModule} from "../core/modules/material.module";

@NgModule({
  declarations: [
    // RadioButtonComponent,
    ConfirmationDialogComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    // HeaderModule,
    ConfirmationDialogComponent,
    SpinnerComponent
  ],
  providers: [],
  entryComponents: []
})
export class SharedModule {

}
