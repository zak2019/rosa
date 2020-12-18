import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GroupedVerticalBarChartComponent} from "./grouped-vertical-bar-chart.component";
import {NgxChartsModule} from "@swimlane/ngx-charts";

@NgModule({
  imports: [
    CommonModule,
    NgxChartsModule
  ],
  declarations: [
    GroupedVerticalBarChartComponent
  ],
  exports: [
    GroupedVerticalBarChartComponent
  ]
})
export class GroupedVerticalBarChartModule {}
