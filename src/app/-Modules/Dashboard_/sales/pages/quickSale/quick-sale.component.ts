import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { quickSalesApiService } from '@Api/Sales/quickSale.service';
import { notificationService } from '@Services/notification.service';
import { GetFunctionService } from '@Services/get-function.service';

@Component({
  selector: 'app-quick-sale',
  templateUrl: './quick-sale.component.html'
})
export class QuickSaleComponent implements OnInit{
constructor(private readonly api:quickSalesApiService,
  private router:Router,
  private readonly toastr:notificationService,
  private readonly functionServ:GetFunctionService){
  
}
show=false
updateSales:boolean=false;
saleData$!:Observable<any>
currentPage: number = 1;
pageSize: number = 4;
pageChange(page:number){
  this.currentPage=page;
}

ngOnInit(): void {

  this.getData()
  
}
public clickEventSubscription=this.functionServ.getClickEvent().subscribe(()=>{
  this.getData();
})
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
deleteData(id:number){
  this.api.deleteQsale(id).subscribe(res=>{
    if(res){
      this.getData()
      this.toastr.showSuccess("deleted successfully")
    }
  })
}

}
