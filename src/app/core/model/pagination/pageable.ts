
export class Pageable {
  pageSize: number;
  pageNumber: number;
  sortBy: string;
  offset:number;
  unpaged:boolean;
  paged:boolean;

  static readonly DEFAULT_PAGE_SIZE = 5;
  static readonly FIRST_PAGE_NUMBER = 0;

  public constructor() {
    this.pageSize = Pageable.DEFAULT_PAGE_SIZE;
    this.pageNumber = Pageable.FIRST_PAGE_NUMBER;
  }
}
