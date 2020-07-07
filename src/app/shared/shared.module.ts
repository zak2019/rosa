import {NgModule} from '@angular/core';
import {SpinnerComponent} from "./spinner.component";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {ConfirmationDialogComponent} from "./confirmation-dialog/confirmation-dialog.component";
import {MaterialModule} from "../core/modules/material.module";
import {AccordionAnchorDirective, AccordionDirective, AccordionLinkDirective} from "./accordion";

@NgModule({
  declarations: [
    // RadioButtonComponent,
    ConfirmationDialogComponent,
    SpinnerComponent,
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule
  ],
  exports: [
    // HeaderModule,
    ConfirmationDialogComponent,
    SpinnerComponent,
    AccordionAnchorDirective,
    AccordionLinkDirective,
    AccordionDirective
  ],
  providers: [],
  entryComponents: []
})
export class SharedModule {

}
