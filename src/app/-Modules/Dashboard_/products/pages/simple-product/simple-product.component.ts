import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { productApiService } from 'src/app/-Core/Http/Api/Products/productsApi.service';

@Component({
  selector: 'app-simple-product',
  templateUrl: './simple-product.component.html'
})
export class SimpleProductComponent implements OnInit {
  constructor(
    private readonly activeRoute: ActivatedRoute,
    private readonly toastr:ToastrService,
    private service: productApiService
  ) {}
  public product: any;
  disable: boolean = true;
  buttonView: boolean = true;
  new_stock!: number;
  hideToast: boolean = true;
  new_price!:number;
 
  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      this.service
        .getSingleProduct(params['productId'])
        .subscribe((response: any) => {
          this.product = response;
          
        });
    });
  }
  editStock() {
    this.disable = false;
    this.buttonView = false;
  }
  updateStock(id: number) {
    const body = { stock: this.new_stock,price:this.new_price };
    this.disable = true;
    this.buttonView = true;
    console.log(this.new_stock);
    this.service.updateSingleProduct(body,id).subscribe((response) => {
      if (response) {
        this.product = response;
      }
      this.toastr.success(`updated successfully, new stock is :${this.product.stock}`)
    });
  }
  close_Toast() {
    this.hideToast = true;
  }
}
