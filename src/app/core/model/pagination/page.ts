import  { Sort } from './sort';
import  { Pageable } from './pageable';

export class Page<T> {
  data: Array<T>; //
  pageable: Pageable; //
  last: boolean; //
  totalPages: number; //
  totalData: number; //
  first: boolean; //
  sort: Sort;
  sortBy: string;
  actualPage: number;//
  size: number;  //
  number: number;

  public constructor() {
    this.pageable = new Pageable();
  }
}
