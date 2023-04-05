import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { apiService } from 'src/app/http services/api.service';
import { GetFunctionService } from 'src/app/services/get-function.service';

@Component({
  selector: 'app-all-sales',
  templateUrl: './all-sales.component.html',
  styleUrls: ['./all-sales.component.scss']
})
export class AllSalesComponent {
    constructor(public apiService:apiService,
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
  url="https://api-sales-app.josetovar.dev"
  get total(): number {
    return Math.ceil(this.totalData / this.pageSize);
  }
  get pages(): any[] {
    const pagesToShow = 3;
    const startPage = Math.max(
      1,
      this.currentPage - Math.floor(pagesToShow / 2)
    );
    const endPage = Math.min(this.total, startPage + pagesToShow - 1);
    const firstPage = 1;
    const lastPage = this.total;
  
    const pages = startPage > firstPage ? [firstPage] : [];
  
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    if(firstPage<startPage-1){
      pages.splice(1,0,-1)
    }
    if (endPage < lastPage - 1) {
      pages.push(-1);
    }
  
    if (endPage < lastPage) {
      pages.push(lastPage);
     
    }
  
    return pages;
  }
  gotoPage(page: number) {
    this.currentPage = page;
  }
  
  prevBtn() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  nxtBtn() {
    if (this.currentPage <= this.total) {
      this.currentPage++;
    }
  }
  ngOnInit(): void {
    
      this.getSales()
    }
    public clickEventSubscription=this.functionServ.getClickEvent().subscribe(()=>{
      this.getSales()
    })
    private getSales() {
      this.sales$ = this.http.get<{
        
          id: number,
          "total": number,
          "created_at": "2023-03-27T04:24:48.849Z",
          client: {
            id: number,
            first_name: string,
            last_name: string,
            address: string,
            city: string,
            state: string,
          country: string,
            phone: string,
            email: string
          },
          items: [
            {
              id: number,
              created_at: string,
              sale_id: number,
              price: number,
              quantity: number,
              product_id: number
            }
          ]
        
      }>(`${this.url}/sales`);
      this.sales$.subscribe((client) => {
        this.totalData = client.length;
  
      });
    }
    
    navigate(){
      this.router.navigate(['quick-sales'])
    }
  
  }

