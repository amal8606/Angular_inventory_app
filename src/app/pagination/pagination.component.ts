import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent implements OnChanges {
  constructor() {}
  @Input()
  currentPage!: number;
  @Input()
  pageSize!: number;
  @Input()
  public products!: Observable<any>;
  // @Input()
  totalData!: number;
  get total(): number {
    return Math.ceil(this.totalData / this.pageSize);
  }
  get pages(): any[] {
    const pagesToShow = 3;
    const startPage = Math.max(
      1,
      this.currentPage - Math.floor(pagesToShow / 2)
    );
    const endPage = Math.min(this.total, startPage + pagesToShow - 1);
    const firstPage = 1;
    const lastPage = this.total;

    const pages = startPage > firstPage ? [firstPage] : [];

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    if(firstPage<startPage-1){
      pages.splice(1,0,-1)
    }
    if (endPage < lastPage - 1) {
      pages.push(-1);
    }

    if (endPage < lastPage) {
      pages.push(lastPage);
      pages.push();
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
  ngOnChanges(changes: SimpleChanges) {
    this.products?.subscribe((product) => {
      this.totalData = product.length;
    });
    if (changes['products']) {
      this.currentPage = 1;
    }
  }
}
