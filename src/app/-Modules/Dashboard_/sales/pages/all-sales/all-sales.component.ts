import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { salesApiService } from 'src/app/-Core/Http/Api/Sales/salesApi.service';
import { GetFunctionService } from 'src/app/-Core/authentication/services/get-function.service';
import { Isales } from 'src/app/-Shared/interfaces/sales.interface';

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
    searchValue!:string;
    currentPage: number = 1;
    pageSize: number = 4;
    totalData!: number;
    filteredClients=[]
    showQuickSale=false
  pageChange(page:number){
    this.currentPage=page
  }
  ngOnInit(): void {
    
      this.getSales()
    }
    public clickEventSubscription=this.functionServ.getClickEvent().subscribe(()=>{
      this.getSales()
    })
    private getSales() {
      this.sales$ = this.http.get<Isales>(`${this.apiService.url}`);
      this.sales$.subscribe((client) => {
        this.totalData = client.length;
  
      });
    }
    
    navigate(){
      this.router.navigate(['quick-sales'])
    }
  
  }

