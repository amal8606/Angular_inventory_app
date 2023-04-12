import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { apiService } from 'src/app/http services/api.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html'
})
export class OverviewComponent implements OnInit{
  constructor(private readonly api:apiService,
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
  
   
    this.quickSaleData$=this.api.getApi('quick-sales')
    this.quickSaleData$.subscribe(data=>{
      this.totalData=data.length
      this.cardsToshow=data.slice(0,this.numberOfdata)
console.log(this.cardsToshow)
    })
 
  this.api.getApi('sales').subscribe(res=>{
    
    this.totalsales=res.length

  })
  this.api.getApi('products').subscribe(res=>{
    this.totalproducts=res.length
    
  })
  this.api.getApi('clients').subscribe(res=>{
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
