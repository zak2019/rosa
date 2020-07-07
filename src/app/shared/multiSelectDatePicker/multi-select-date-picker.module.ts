import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MultiSelectDatePickerComponent} from "./multi-select-date-picker.component";
import {MaterialModule} from "../../core/modules/material.module";
import {MatFormFieldModule} from "@angular/material/form-field";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  declarations: [
    MultiSelectDatePickerComponent
  ],
  exports: [
    MultiSelectDatePickerComponent
  ]
})
export class MultiSelectDatePickerModule {}
