import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  constructor() {}
  @Input()
  currentPage!: number;
  @Input()
  pageSize!: number;
  @Input()
  public products!: Observable<any>;
  @Input()
  totalData!: number;
  get total(): number {
    return Math.ceil(this.totalData / this.pageSize);
  }
  get pages(): number[] {
    const pages = [];
    for (let i = 1; i <= this.total; i++) {
      pages.push(i);
    }
    return pages;
  }

  @Output() paginate = new EventEmitter<number>();

  gotoPage(page: number) {
    this.paginate.emit(page);
  }

  prevBtn() {
    if (this.currentPage > 1) {
      this.paginate.emit(this.currentPage - 1);
    }
  }
  nxtBtn() {
    if (this.currentPage <= this.total) {
      this.paginate.emit(this.currentPage + 1);
    }
  }
}
