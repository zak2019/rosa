import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {WeatherTableComponent} from "./weather-table.component";

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    WeatherTableComponent
  ],
  exports: [
    WeatherTableComponent
  ]
})
export class WeatherTableModule {}
