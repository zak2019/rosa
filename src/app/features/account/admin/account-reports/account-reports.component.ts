import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs/internal/Subject';
import {Chart} from '../../../../core/model/chart';

const data = {
  "Bar": {
    "labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    "series": [[9, 4, 11, 7, 10, 12], [3, 2, 9, 5, 8, 10]]
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

  constructor() {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.ngUnSubscribe.next();
    this.ngUnSubscribe.complete();
  }
}
