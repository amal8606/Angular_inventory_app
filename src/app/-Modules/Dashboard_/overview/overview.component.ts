import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { productApiService } from 'src/app/-Core/Http/Api/Products/productsApi.service';
import { quickSalesApiService } from 'src/app/-Core/Http/Api/Sales/quickSale.service';
import { salesApiService } from 'src/app/-Core/Http/Api/Sales/salesApi.service';
import { clientApiService } from 'src/app/-Core/Http/Api/clients/clientApi.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html'
})
export class OverviewComponent implements OnInit{
  constructor(private readonly apiQsale:quickSalesApiService,
    private readonly apiProduct:productApiService,
    private readonly apiSale:salesApiService,
    private readonly apiClient:clientApiService,

    private readonly navigateUrl:Router
    ){

  }
  totalsales!:number;
  totalproducts!:number;
  totalClients!:number;
  cardsToshow:any=[]
  numberOfdata=4;
  totalData!:number;

quickSaleData$!:Observable<any>;
ngOnInit(): void {
  this.getData()
}
getData(){
  
   
    this.quickSaleData$=this.apiQsale.getApi()
    this.quickSaleData$.subscribe(data=>{
      this.totalData=data.length
      this.cardsToshow=data.slice(0,this.numberOfdata)
console.log(this.cardsToshow)
    })
 
  this.apiSale.getApi().subscribe(res=>{
    
    this.totalsales=res.length

  })
  this.apiProduct.getApi().subscribe(res=>{
    this.totalproducts=res.length
    
  })
  this.apiClient.getApi().subscribe(res=>{
  this.totalClients=res.length
   
  })
}
viewAll(){
  this.numberOfdata=this.totalData
  this.quickSaleData$.subscribe(data=>
    this.cardsToshow=data);
}
addTosales(saleId:number){
  this.navigateUrl.navigate(['dashboard/sales'],{queryParams:{quicksale:saleId}})
}
navigate(){
  this.navigateUrl.navigate(['dashboard/sales/quicksales'])
}
}
