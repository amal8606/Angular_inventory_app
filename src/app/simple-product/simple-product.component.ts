import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { apiService } from '../http services/api.service';

@Component({
  selector: 'app-simple-product',
  templateUrl: './simple-product.component.html',
  styleUrls: ['./simple-product.component.scss'],
})
export class SimpleProductComponent implements OnInit {
  constructor(
    private readonly activeRoute: ActivatedRoute,
    private readonly toastr:ToastrService,
    private readonly http: HttpClient,
    private service: apiService
  ) {}
  public product: any;
  disable: boolean = true;
  buttonView: boolean = true;
  new_stock!: number;
  hideToast: boolean = true;
  new_price!:number;
  url = 'https://63be61a4585bedcb36ac081a.mockapi.io/products';
  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
      this.service
        .getSingleProduct(params['productId'])
        .subscribe((response: any) => {
          this.product = response;
          console.log(this.product);
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
    console.log(id);
    console.log(this.new_stock);
    this.http.put(`${this.url}/${id}`, body).subscribe((response) => {
      if (response) {
        console.log(response);
        this.product = response;
      }
      this.toastr.success(`updated successfully, new stock is :${this.product.stock}`)
    });
  }
  close_Toast() {
    this.hideToast = true;
  }
}
