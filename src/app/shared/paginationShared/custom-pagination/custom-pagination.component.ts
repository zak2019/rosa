import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import {Page} from "../../../core/model/pagination/page";

@Component({
  selector: 'app-custom-pagination',
  templateUrl: './custom-pagination.component.html',
  styleUrls: ['./custom-pagination.component.scss']
})
export class CustomPaginationComponent implements OnInit {

  pageSizeOptions = [5, 10, 15];
  @Input() page: Page<any>;
  @Output() nextPageEvent = new EventEmitter();
  @Output() previousPageEvent = new EventEmitter();
  @Output() pageSizeEvent: EventEmitter<number> = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  nextPage(): void {
    this.nextPageEvent.emit(null);
  }

  previousPage(): void {
    this.previousPageEvent.emit(null);
  }

  updatePageSize(pageSize: number): void {
    this.pageSizeEvent.emit(pageSize);
  }

}
