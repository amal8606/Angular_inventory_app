import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { quickSalesApiService } from 'src/app/-Core/Http/Api/Sales/quickSale.service';

@Component({
  selector: 'app-quick-sale',
  templateUrl: './quick-sale.component.html'
})
export class QuickSaleComponent implements OnInit{
constructor(private readonly api:quickSalesApiService,
  private router:Router,
  private activeRouter:ActivatedRoute){
  
}
show=false
saleData$!:Observable<any>
currentPage: number = 1;
pageSize: number = 4;
pageChange(page:number){
  this.currentPage=page;
}

ngOnInit(): void {

  this.getData()
}
getData(){
  this.api.getApi().subscribe({
    next:(res)=>{
      this.saleData$=of(res)
    }
  })
 
}
addTosale(id:Number){
  this.router.navigate(['dashboard/sales'],{queryParams:{quicksale:id}})
  this.show=false;

}
viewSale(id:number){
  this.router.navigate(['/singleproduct'],{queryParams:{saleId:id}})
}
}
