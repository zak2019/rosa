import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {COLORSETS} from "./color-sets";


@Component({
  selector: 'app-grouped-vertical-bar-chart',
  templateUrl: 'grouped-vertical-bar-chart.component.html',
  styleUrls: ['grouped-vertical-bar-chart.component.scss']
})

export class GroupedVerticalBarChartComponent implements  OnInit{


  view: any[];
  schemeType: string = 'ordinal';

  @Input() groupedWeather;
  @Input()  xAxisLabel = '';
  @Input()  yAxisLabel = '';

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  legendTitle = 'Legend';
  legendPosition = 'right';
  showXAxisLabel = true;
  tooltipDisabled = false;

  showYAxisLabel = true;
  showGridLines = true;
  barPadding = 8;
  groupPadding = 16;
  roundDomains = false;
  roundEdges: boolean = true;
  animations: boolean = true;
  yScaleMax: number;
  showDataLabel = false;
  noBarWhenZero = true;
  trimXAxisTicks = true;
  trimYAxisTicks = true;
  rotateXAxisTicks = true;
  maxXAxisTickLength = 16;
  maxYAxisTickLength = 10;

  fitContainer: boolean = false;
  linearScale: boolean = false;
  width: number = 700;
  height: number = 300;

  selectedColorScheme: string;
  colorScheme: any;
  colorSets = COLORSETS;

  constructor() {

  }

  ngOnInit() {
    this.yScaleMax = 100;
    this.setColorScheme('weather');

    this.linearScale = false;

    this.width = 700;
    this.height = 300;
    //
    // Object.assign(this, this.chart.defaults);

    if (!this.fitContainer) {
      this.applyDimensions();
    }
  }


  select(data) {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onLegendLabelClick(entry) {
    console.log('Legend clicked', entry);
  }

  activate(data) {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  deactivate(data) {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

  applyDimensions() {
    this.view = [this.width, this.height];
  }

  setColorScheme(name) {
    this.selectedColorScheme = name;
    this.colorScheme = this.colorSets.find(s => s.name === name);
  }
}
