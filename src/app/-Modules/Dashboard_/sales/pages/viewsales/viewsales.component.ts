import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { salesApiService } from 'src/app/-Core/Http/Api/Sales/salesApi.service';
import { productApiService } from 'src/app/-Core/Http/Api/Products/productsApi.service';

@Component({
  selector: 'app-viewsales',
  templateUrl: './viewsales.component.html'
})
export class ViewsalesComponent implements OnInit {
  constructor(
    private readonly activeRoute: ActivatedRoute,
    private apiservice: salesApiService,
    private readonly productApi:productApiService
  ) {}
  showCart=false
  public sales!: any;
  createdDate:any;
  products:any=[];
  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      this.apiservice
        .getSingleSales(params['sale_id'])
        .subscribe((res) => {
          this.sales = res;
          this.createdDate=new Date(this.sales.items[0].created_at)
          console.log(this.createdDate)
          this.getProducts()
        });
    });
  
  }
 
    getProducts(){
      this.sales?.items.forEach((element:any) => {
        this.productApi.getSingleProduct(element.product_id
          ).subscribe(response=>{
    this.products.push(response)
          })
          
        });
    }
  
}
