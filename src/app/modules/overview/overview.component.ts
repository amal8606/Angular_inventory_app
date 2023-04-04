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
quickSaleData$!:Observable<any>;
ngOnInit(): void {
  this.getData()
}
getData(){
  this.api.getApi('quick-sales').subscribe(res=>{
    console.log(res)
    this.quickSaleData$=of(res)
  })
}
addTosales(saleId:number){
  this.navigateUrl.navigate(['dashboard/sales'],{queryParams:{quicksale:saleId}})
}
}
