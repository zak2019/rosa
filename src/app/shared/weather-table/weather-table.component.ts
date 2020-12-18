import {Component, Input, OnInit} from '@angular/core';


@Component({
  selector: 'app-weather-table',
  templateUrl: 'weather-table.component.html',
  styleUrls: ['weather-table.component.scss']
})

export class WeatherTableComponent implements  OnInit{

  @Input() sunnyClearWeatherNumber;
  @Input() sunnyCloudWeatherNumber;
  @Input() rainyWeatherNumber;
  @Input() stormWeatherNumber;

  constructor() {
  }

  ngOnInit() {
  }

}
