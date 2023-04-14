import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { productApiService } from '@Api/Products/productsApi.service';
import { quickSalesApiService } from '@Api/Sales/quickSale.service';
import { salesApiService } from '@Api/Sales/salesApi.service';
import { clientApiService } from '@Api/clients/clientApi.service';

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
 public totalsales!:number;
 public totalproducts!:number;
 public totalClients!:number;
 public cardsToshow:any=[]
 public numberOfdata=4;
 public totalData!:number;

 public quickSaleData$!:Observable<any>;
ngOnInit(): void {
  this.getData()
}
public getData(){
  
   
    this.quickSaleData$=this.apiQsale.getApi()
    this.quickSaleData$.subscribe(data=>{
      this.totalData=data.length
      this.cardsToshow=data.slice(0,this.numberOfdata)
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
public viewAll(){
  this.numberOfdata=this.totalData
  this.quickSaleData$.subscribe(data=>
    this.cardsToshow=data);
}
public addTosales(saleId:number){
  this.navigateUrl.navigate(['dashboard/sales'],{queryParams:{quicksale:saleId}})
}
public navigate(){
  this.navigateUrl.navigate(['dashboard/sales/quicksales'])
}
}
