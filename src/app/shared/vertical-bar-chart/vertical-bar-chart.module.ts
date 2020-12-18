import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {VerticalBarChartComponent} from "./vertical-bar-chart.component";
import {NgxChartsModule} from "@swimlane/ngx-charts";

@NgModule({
  imports: [
    CommonModule,
    NgxChartsModule
  ],
  declarations: [
    VerticalBarChartComponent
  ],
  exports: [
    VerticalBarChartComponent
  ]
})
export class VerticalBarChartModule {}
