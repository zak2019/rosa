import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CountdownComponent} from "./countdown.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@NgModule({
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ],
  declarations: [
    CountdownComponent
  ],
  exports: [
    CountdownComponent
  ]
})
export class CountdownModule {}
