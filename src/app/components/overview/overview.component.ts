import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { apiService } from 'src/app/http services/api.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit{
  constructor(private readonly api:apiService,
    private readonly navigateUrl:Router
    ){

  }
  totalsales!:number;
  totalproducts!:number;
  totalClients!:number;

quickSaleData$!:Observable<any>;
ngOnInit(): void {
  this.getData()
}
getData(){
  this.api.getApi('quick-sales').subscribe(res=>{
   
    this.quickSaleData$=of(res)
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
addTosales(saleId:number){
  this.navigateUrl.navigate(['dashboard/sales'],{queryParams:{quicksale:saleId}})
}
navigate(){
  this.navigateUrl.navigate(['dashboard/sales/quicksales'])
}
}
