import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
})
export class PaginationComponent implements OnChanges{
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
  ngOnChanges(changes: SimpleChanges) {
    this.products.subscribe(product=>{
      console.log(product.length)
      this.totalData=product.length
    })
    if(changes['products']){
      this.currentPage=1
    }

  }

 

}
  


