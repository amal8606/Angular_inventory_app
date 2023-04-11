import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable,of } from 'rxjs';
import { apiService } from 'src/app/http services/api.service';

@Component({
  selector: 'app-single-sale',
  templateUrl: './single-sale.component.html',
  styleUrls: ['./single-sale.component.scss']
})
export class SingleSaleComponent implements OnInit{
constructor(private readonly router:Router,
  private readonly active:ActivatedRoute,
  private readonly api:apiService){

}
saleData!:any;
ngOnInit(): void {
  this.getData()
}
getData(){
  this.active.params.subscribe(param=>{
    this.api.getSingleProduct(param['id'],'quick-sales').subscribe({
      next:(res)=>{
        this.saleData=res
      }
    })
  })
}
}
