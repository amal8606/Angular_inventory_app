import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { quickSalesApiService } from 'src/app/-Core/Http/Api/Sales/quickSale.service';

@Component({
  selector: 'app-single-sale',
  templateUrl: './single-sale.component.html'

})
export class SingleSaleComponent implements OnInit{
constructor(
  private readonly active:ActivatedRoute,
  private readonly api:quickSalesApiService){

}
saleData!:any;
ngOnInit(): void {
  this.getData()
}
getData(){
  this.active.params.subscribe(param=>{
    this.api.getSinglequickSales(param['id']).subscribe({
      next:(res)=>{
        this.saleData=res
      }
    })
  })
}
}
