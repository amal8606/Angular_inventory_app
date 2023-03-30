import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { apiService } from '../http services/api.service';

@Component({
  selector: 'app-viewsales',
  templateUrl: './viewsales.component.html',
  styleUrls: ['./viewsales.component.scss'],
})
export class ViewsalesComponent implements OnInit {
  constructor(
    private readonly activeRoute: ActivatedRoute,
    private apiservice: apiService
  ) {}
  showCart=false
  public sales!: any;
  createdDate:any;
  products:any=[];
  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      this.apiservice
        .getSingleProduct(params['sale_id'], 'sales')
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
        this.apiservice.getSingleProduct(element.product_id,'products'
          ).subscribe(response=>{
    this.products.push(response)
          })
          
        });
    }
  
}
