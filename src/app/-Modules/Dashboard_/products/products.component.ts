import { formatCurrency } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, map, of } from 'rxjs';
import { productApiService } from 'src/app/-Core/Http/Api/Products/productsApi.service';
import { notificationService } from '../../../-Core/authentication/services/notification.service';
import { Iproducts } from 'src/app/-Shared/interfaces/product.interface';

@Component({
  selector: 'app-dashboard',
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {
  constructor(
    private api: productApiService,
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

  public addNewRow: FormGroup = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(''),
    sku: new FormControl(''),
    stock: new FormControl(''),
    active: new FormControl(false),
  });
  ngOnInit(): void {
    this.getProducts();
  }
  private getProducts() {
    this.isloading = true;
    this.userData$ = this.http.get<Iproducts>(this.api.url);

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
    this.userData$ = this.api.getApi().pipe(
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
    this.userData$ = this.api.getApi().pipe(
      map((products: any) => {
        if (event.target.value == 0) {
          const newProduct = products.filter(
            (product: any) => product.stock == 0
          );
       

          return newProduct;
        } else if (event.target.value == 1) {
          const newProduct = products.filter(
            (product: any) => product.stock != 0
          );
       

          return newProduct;
        } else {

          return products;
        }
      })
    );
  }
  searchProduct() {
    this.userData$ = this.userData$.pipe(
      map((products: any) => {
        return products.filter((product: Iproducts) =>
          product.name.toLowerCase().includes(this.searchValue.toLowerCase())
        );
      })
    );
  }

  ////////////////////////////////////////////////////////////
  UpdateStatus(product: Iproducts, event: any) {
    const status = event.target.checked;
    this.http
      .put(
        `${this.api.url}/status/${product.id}?status=${status}`,
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

  setFormatCurrency(product: Iproducts, event: any) {
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
  updateValue(product: Iproducts) {
    const { price } = this.updateForm.controls[product.id].value;
    let newValues = {
      ...product,
      ...this.updateForm.controls[product.id].value,
      price: +price.substring(1).replaceAll(',', ''),
    };

    let { enableEdit } = this.updateForm.controls[product.id].value;

    this.api.updateSingleProduct(newValues,product.id).subscribe((response) => {
      if (response) {
        this.toastr.showSuccess('Updated successfully...');
        this.api.getApi().subscribe((response: any) => {
          this.userData$ = of(response);
        });

        enableEdit = false;
      }
    });
  }

  deleteRow(id: number) {
    if (confirm('Are you sure, want to delete the field ?..')) {
      this.api.deleteProduct(id).subscribe((response: any) => {
        if (response) {
          this.isloading = true;

          this.toastr.showSuccess('deleted successfully...');
      this.getProducts()
        }
      });
    }
  }
  disableUpdateButton(product: Iproducts) {
    const { price, stock } = this.updateForm.controls[product.id].value;

    const formatPrice = price.replaceAll('$', '').replaceAll(',', '');

    return product.price == formatPrice && stock == product.stock;
  }
  disableEditing(product: Iproducts) {
    const { enableEdit } = this.updateForm.controls[product.id].value;
    return enableEdit;
  }
  createProduct() {
    this.onEdit = true;
  }
  addRow() {
    const { name, price, sku, stock,active} = this.addNewRow.value;
    this.api.addProduct(this.addNewRow.value).subscribe((res) => {
      if (res) {
        this.toastr.showSuccess('New product added successfully!');
   this.getProducts()
   this.addNewRow.reset()
   this.onEdit = false
      }
    });
  }
  cancelChanges() {
    this.onEdit = false;
    this.addNewRow.reset()
  }
}
