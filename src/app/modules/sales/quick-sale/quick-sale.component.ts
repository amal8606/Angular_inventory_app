import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, CanActivate, Router } from '@angular/router';
import { Observable,of } from 'rxjs';
import { apiService } from 'src/app/http services/api.service';

@Component({
  selector: 'app-quick-sale',
  templateUrl: './quick-sale.component.html'
})
export class QuickSaleComponent implements OnInit{
constructor(private readonly api:apiService,
  private router:Router,
  private activeRouter:ActivatedRoute){
  
}
show=false
saleData$!:Observable<any>
ngOnInit(): void {

  this.getData()
}
getData(){
  this.api.getApi('quick-sales').subscribe({
    next:(res)=>{
      console.log(res)
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
