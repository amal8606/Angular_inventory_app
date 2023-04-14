import { formatCurrency } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, map, of } from 'rxjs';
import { productApiService } from '@Api/Products/productsApi.service';
import { notificationService } from '@Services/notification.service';
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
  public disable: boolean = false;
  public buttonView: boolean = true;
  public new_stock!: number;
  public userData$!: Observable<any>;
  public productCopy: any;
  public onEdit = false;
  public endpoint = 'products';
  public currentPage = 1;
  public pageSize = 3;
  public totalData!: number;
  public updateForm: FormGroup = new FormGroup({});

  public addNewRow: FormGroup = new FormGroup({
    name: new FormControl(''),
    price: new FormControl(''),
    sku: new FormControl(''),
    stock: new FormControl(''),
    active: new FormControl(false),
  });
  public searchPruduct:FormGroup= new FormGroup({
    value:new FormControl(''),
  })
  ngOnInit(): void {
    this.getProducts();
    this.searchPruduct.valueChanges.subscribe(values=>
      {if(values.value){
        this.searchProduct(values.value)
      }else{
        this.getProducts() 
      }
        
      })
  }
  private getProducts() {
    this.isloading = true;
    this.userData$ = this.api.getApi();

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

  public pageChange(pageNumber: number) {
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
  public searchProduct(name:string) {
    if(name){
      this.userData$ = this.userData$.pipe(
        map((products: any) => {
          return products.filter((product: Iproducts) =>
            product.name.toLowerCase().includes(name.toLowerCase())
          );
        })
      );
    }else{
      this.getProducts()
    }
    
  }

  ////////////////////////////////////////////////////////////
  public UpdateStatus(product: Iproducts, event: any) {
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

  public setFormatCurrency(product: Iproducts, event: any) {
    const price = formatCurrency(
      this.getValueFromCurrency(event.target.value),
      'en_US',
      '$'
    );
  }
  public getValueFromCurrency(value: string): number {
    let price: number;
    if (value.includes('$')) {
      price = Number(value.substring(1).replaceAll(',', ''));
    } else {
      price = Number(value.replaceAll(',', ''));
    }
    return price;
  }
  public updateValue(product: Iproducts) {
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

  public deleteRow(id: number) {
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
  public disableUpdateButton(product: Iproducts) {
    const { price, stock } = this.updateForm.controls[product.id].value;

    const formatPrice = price.replaceAll('$', '').replaceAll(',', '');

    return product.price == formatPrice && stock == product.stock;
  }
  public disableEditing(product: Iproducts) {
    const { enableEdit } = this.updateForm.controls[product.id].value;
    return enableEdit;
  }
  public createProduct() {
    this.onEdit = true;
  }
 public addRow() {
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
  public cancelChanges() {
    this.onEdit = false;
    this.addNewRow.reset()
  }
}
