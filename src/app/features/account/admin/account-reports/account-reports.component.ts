import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs/internal/Subject';
import {Chart} from '../../../../core/model/chart';
import {EventService} from "../../../../core/services/event.service";
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {Team} from "../../../../core/model/Team";
import {groupBy, mergeMap, takeUntil, toArray} from "rxjs/operators";
import {TeamService} from "../../../../core/services/team.service";
import {Event} from "../../../../core/model/event";
import {from} from "rxjs/internal/observable/from";
import {defaultWeather} from "../../../../core/model/eventWeather";

const data = {
  "Bar": {
    "labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    "series": [[9, 4, 11, 7, 10, 12], [3, 2, 9, 5, 8, 10], [3, 2, 9, 5, 8, 10],  [3, 2, 9, 5, 8, 10]]
  },
  "Pie": {
    "series": [20, 10, 30, 40]
  }
};

@Component({
  selector: 'app-account-reports',
  templateUrl: './account-reports.component.html',
  styleUrls: ['./account-reports.component.scss']
})
export class AccountReportsComponent implements OnInit, OnDestroy {


  private ngUnSubscribe: Subject<void> = new Subject<void>();

  // Barchart
  barChart1: Chart = {
    type: 'Bar',
    data: data['Bar'],
    options: {
      seriesBarDistance: 15,
      high: 12,

      axisX: {
        showGrid: false,
        offset: 20
      },
      axisY: {
        showGrid: true,
        offset: 40
      },
      height: 360
    },

    responsiveOptions: [
      [
        'screen and (min-width: 640px)',
        {
          axisX: {
            labelInterpolationFnc: function (
              value: number,
              index: number
            ): string {
              return index % 1 === 0 ? `${value}` : null;
            }
          }
        }
      ]
    ]
  };


  // This is for the donute chart
  donuteChart1: Chart = {
    type: 'Pie',
    data: data['Pie'],
    options: {
      donut: true,
      height: 260,
      showLabel: false,
      donutWidth: 20
    }
  };

  weatherForAllEvents: any = [];
  weatherForAllEventsByEventType: any = [];
  accountId: string;
  reportFilterFormGroup: FormGroup;
  teamList: Team[] = [];
  eventList: Event[] = [];
  showCharts = false;
  showGroupedChart = false;
  showRetroTable = false;
  showStartRetroTable = false;
  constructor(private route: ActivatedRoute,
              private eventService: EventService,
              private teamService: TeamService) {
  }

  ngOnInit() {
    this.accountId = this.route.snapshot.parent.parent.params.accountId;
    this.teamService.getTeamsByAccountId(this.accountId)
      .pipe(takeUntil(this.ngUnSubscribe))
      .subscribe(teams => this.teamList = teams);

    this.reportFilterFormGroup = new FormGroup({
      team: new FormControl(),
      startDateInput: new FormControl(),
      endDateInput: new FormControl()
    });
  }

  generateReport() {
    this.eventService.getEventsByDatesAndAccountIdAndTeamId(
      this.accountId,
      this.reportFilterFormGroup.controls['team'].value,
      this.reportFilterFormGroup.controls['startDateInput'].value,
      this.reportFilterFormGroup.controls['endDateInput'].value,
    ).pipe(takeUntil(this.ngUnSubscribe)).subscribe( events =>   {
      this.eventList = events;
      this.showCharts = true;
      this.weatherForAllEvents = this.prepareChartData(events);
      this.prepareGroupedChartData(events);
    });
  }

  private prepareChartData(events: Event[]) {
    defaultWeather[0].value = 0;
    defaultWeather[1].value = 0;
    defaultWeather[2].value = 0;
    defaultWeather[3].value = 0;
    let sunnyClear = 0;
    let sunnyCloud = 0;
    let rainy = 0;
    let storm = 0;
    events.forEach(e => {
      e.eventWeatherSet.forEach(weather => {
        if(weather.sunnyClear) {sunnyClear++} else
        if(weather.sunnyCloud) {sunnyCloud++} else
        if(weather.rainy) {rainy++} else {
          storm++
        }
      });
    });
    let sum = sunnyClear + sunnyCloud + rainy + storm;
    if(sum > 0) {
      defaultWeather[0].value = sunnyClear/sum * 100;
      defaultWeather[1].value = sunnyCloud/sum * 100;
      defaultWeather[2].value = rainy/sum * 100;
      defaultWeather[3].value = storm/sum * 100;
    }
    return defaultWeather.map(x => Object.assign({}, x));
  }

  private prepareGroupedChartData(events: Event[]) {
    this.weatherForAllEventsByEventType = [];
    const source = from(events);
    const example = source.pipe(
      groupBy(event => event.name),
      // return each item in group as array
      mergeMap(group => group.pipe(toArray()))
    );

    example.subscribe(value => {
      let chartData = this.prepareChartData(value);
      let eventLabel = value[0].name;
      let eventNumber = value.length;
      this.weatherForAllEventsByEventType
        .push({name: eventLabel + ' ' + '(' + eventNumber + ')', series: chartData});
    });
    this.showGroupedChart = true;
  }

  setSelectedTeam(team: Team) {
    this.reportFilterFormGroup.controls['team'].setValue(team.teamId);
  }

  startRetroWeather() {
    this.showRetroTable = true;
    this.showStartRetroTable = true;
  }

  stopRetroWeather() {
    this.showStartRetroTable = false;
  }

  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }
}
