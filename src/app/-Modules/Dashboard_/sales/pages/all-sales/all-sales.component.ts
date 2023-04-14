import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { salesApiService } from '@Api/Sales/salesApi.service';
import { GetFunctionService } from '@Services/get-function.service';

@Component({
  selector: 'app-all-sales',
  templateUrl: './all-sales.component.html'
 
})
export class AllSalesComponent {
    constructor(public apiService:salesApiService,
      public readonly http:HttpClient,
      public readonly functionServ:GetFunctionService,
      private readonly router:Router){
  
    }
    public clients$!:Observable<any>;
    public products$!:Observable<any>;
    public sales$!:Observable<any>;
    public currentPage: number = 1;
    public pageSize: number = 4;
    public totalData!: number;
    public filteredClients=[]
    public showQuickSale=false
    public pageChange(page:number){
    this.currentPage=page
  }
  ngOnInit(): void {
    
      this.getSales()
    }
    public clickEventSubscription=this.functionServ.getClickEvent().subscribe(()=>{
      this.getSales()
    })
    private getSales() {
      this.sales$ = this.apiService.getApi();
      this.sales$.subscribe((client) => {
        this.totalData = client.length;
  
      });
    }
    
    navigate(){
      this.router.navigate(['quick-sales'])
    }
  
  }

