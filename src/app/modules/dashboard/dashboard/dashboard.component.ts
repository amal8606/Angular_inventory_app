import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiService } from '../../../http services/api.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, of, map, filter } from 'rxjs';
import { notificationService } from '../../../services/notification.service';
import { formatCurrency } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(
    private api: apiService,
    private http: HttpClient,
    private toastr: notificationService
  ) {}
  isloading: boolean = false;
  public activeEvent: any;
  public stockEvent: any;
  disable: boolean = false;
  buttonView: boolean = true;
  new_stock!: number;
  userData$!: Observable<any>;
  productCopy: any;
  onEdit = false;
  searchValue!: string;
  endpoint = 'products';
  currentPage = 1;
  pageSize = 3;
  totalData!: number;
  public updateForm: FormGroup = new FormGroup({});
  url = 'https://api-sales-app.josetovar.dev/products';

  public addNewRow: FormGroup = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(''),
    sku: new FormControl(''),
    stock: new FormControl(''),
    active: new FormControl(false),
  });
  ngOnInit(): void {
    this.isloading = true;
    this.userData$ = this.http.get<{
      id: number;
      name: string;
      price: number;
      sku: string;
      stock: number;
    }>(this.url);

    this.userData$.subscribe({
      next: (products) => {
        this.totalData = products.length;
        products.map((product: any) => {
          this.updateForm.addControl(
            `${product.id}`,
            new FormGroup({
              price: new FormControl(
                formatCurrency(product.price, 'en-US', '$')
              ),
              stock: new FormControl(product.stock),
              enableEdit: new FormControl(product.active),
            })
          );
        });
      },
      error: () => {
        this.toastr.showError('timeout, please login again...');
      },
      complete: () => {
        this.isloading = false;
      },
    });
  }
  pageChange(pageNumber: number) {
    this.currentPage = pageNumber;
  }
  /////Filter///////////////////////
  public setFilter(activeEvent: any): void {
    this.currentPage=1
    this.userData$ = this.http.get(this.url).pipe(
      map((products: any) => {
        if (activeEvent.target.value) {
          const newProduct = products.filter(
            (product: any) =>
              product.active.toString() === activeEvent.target.value
          );
          this.totalData = newProduct.length;

          return newProduct;
        } else {
          this.totalData = products.length;

          return products;
        }
      })
    );
  }
  public stockFilter(event: any): void {
    this.currentPage=1
    this.userData$ = this.http.get<any>(this.url).pipe(
      map((products: any) => {
        if (event.target.value == 0) {
          const newProduct = products.filter(
            (product: any) => product.stock == 0
          );
          this.totalData = newProduct.length;

          return newProduct;
        } else if (event.target.value == 1) {
          const newProduct = products.filter(
            (product: any) => product.stock != 0
          );
          this.totalData = newProduct.length;

          return newProduct;
        } else {
          this.totalData = products.length;

          return products;
        }
      })
    );
  }
  searchProduct() {
    this.userData$ = this.userData$.pipe(
      map((products: any) => {
        return products.filter((product: any) =>
          product.name.toLowerCase().includes(this.searchValue.toLowerCase())
        );
      })
    );
  }

  ////////////////////////////////////////////////////////////
  UpdateStatus(product: any, event: any) {
    const status = event.target.checked;
    this.http
      .put(
        `https://api-sales-app.josetovar.dev/product-status/${product.id}?status=${status}`,
        {}
      )
      .subscribe({
        next: (response) => {
          if (response) {
            if (status) {
              this.toastr.showSuccess(
                `Product with ID: ${product.id} has been activated successfully.`
              );
            } else {
              this.toastr.showWarining(
                `Product with ID: ${product.id} has been deactivated..`
              );
            }
          }
        },
        error: (error) => {
          this.toastr.showError(
            `Product with ID: ${product.id} does not exist.`
          );
        },
        complete: () => {
          console.log('complete');
        },
      });
  }

  setFormatCurrency(product: any, event: any) {
    const price = formatCurrency(
      this.getValueFromCurrency(event.target.value),
      'en_US',
      '$'
    );
  }
  getValueFromCurrency(value: string): number {
    let price: number;
    if (value.includes('$')) {
      price = Number(value.substring(1).replaceAll(',', ''));
    } else {
      price = Number(value.replaceAll(',', ''));
    }
    return price;
  }
  updateValue(product: any) {
    const { price } = this.updateForm.controls[product.id].value;
    let newValues = {
      ...product,
      ...this.updateForm.controls[product.id].value,
      price: +price.substring(1).replaceAll(',', ''),
    };

    let { enableEdit } = this.updateForm.controls[product.id].value;

    this.api.updateSingleProduct(newValues).subscribe((response) => {
      if (response) {
        this.toastr.showSuccess('Updated successfully...');
        this.api.getApi(this.endpoint).subscribe((response: any) => {
          this.userData$ = of(response);
        });

        enableEdit = false;
      }
    });
  }

  deleteRow(id: number) {
    if (confirm('Are you sure, want to delete the field ?..')) {
      this.http.delete(`${this.url}/${id}`).subscribe((response: any) => {
        if (response) {
          this.isloading = true;

          this.toastr.showSuccess('deleted successfully...');
          this.api.getApi(this.endpoint).subscribe({
            next: (response: any) => {
              console.log(response);
              this.userData$ = of(response);
            },
            complete: () => {
              this.isloading = false;
            },
          });
        }
      });
    }
  }
  disableUpdateButton(product: any) {
    const { price, stock } = this.updateForm.controls[product.id].value;

    const formatPrice = price.replaceAll('$', '').replaceAll(',', '');

    return product.price == formatPrice && stock == product.stock;
  }
  disableEditing(product: any) {
    const { enableEdit } = this.updateForm.controls[product.id].value;
    return enableEdit;
  }
  createProduct() {
    this.onEdit = true;
  }
  addRow() {
    const { name, price, sku, stock } = this.addNewRow.value;
    console.log(this.addNewRow.value);
    this.http.post(this.url, this.addNewRow.value).subscribe((res) => {
      if (res) {
        this.toastr.showSuccess('New product added successfully!');
    
      }
    });
  }
  cancelChanges() {
    this.onEdit = false;
  }
}
