import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation
} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-multi-select-date-picker',
  templateUrl: 'multi-select-date-picker.component.html',
  styleUrls: ['multi-select-date-picker.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class MultiSelectDatePickerComponent implements  OnInit{

  @Output() dateList: EventEmitter<any> = new EventEmitter();
  @Input() group: FormGroup;
  @Input() control: FormControl;
  @Input() placeholder: string;

  daysSelected: any[] = [];
  event: any;
  // @ViewChild('appMenu') appMenu;


  constructor() {}

  ngOnInit() {
  }

  sendDates() {
    this.dateList.emit(this.daysSelected);
  }

  isSelected = (event: any) => {
    const date =
      event.getFullYear() +
      "-" +
      ("00" + (event.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + event.getDate()).slice(-2);
    return this.daysSelected.find(x => x == date) ? "selected" : null;
  };

  select(event: any, calendar: any) {
    const date =
      event.getFullYear() +
      "-" +
      ("00" + (event.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + event.getDate()).slice(-2);
    const index = this.daysSelected.findIndex(x => x == date);
    if (index < 0) this.daysSelected.push(date);
    else this.daysSelected.splice(index, 1);
    this.dateList.emit(this.daysSelected);
    calendar.updateTodaysDate();
  }


}
