import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { quickSalesApiService } from '@Api/Sales/quickSale.service';
import { GenerateDataService } from '@Services/generate-data.service';
import { GetFunctionService } from '@Services/get-function.service';
import { notificationService } from '@Services/notification.service';
import { Iproducts } from 'src/app/-Shared/interfaces/product.interface';

@Component({
  selector: 'app-update-sale',
  templateUrl: './updateSales.component.html',
})
export class updateSaleComponent implements OnInit {
  constructor(
    private readonly active: ActivatedRoute,
    private readonly api: quickSalesApiService,
    private readonly route: Router,
    private readonly productData: GenerateDataService,
    private readonly toastr: notificationService,
    private readonly functionServ: GetFunctionService
  ) {}
  public allProducts!: any[];
  public saleData!: any;
  private allProductData!: any[];
  public addNew: boolean = false;
  public data!: any;
  public showProducts: boolean = false;
  public selectedProducts: any = [];

  public qSaleForm: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl('', Validators.required),
    productName: new FormControl(''),
    products: new FormArray([], Validators.required),
  });
  get qSaleproducts(): FormArray {
    return this.qSaleForm.controls['products'] as FormArray;
  }

  ngOnInit(): void {
    this.getSales();
  }
  public getSales() {
    this.active.params.subscribe((query) => {
      this.api.getSinglequickSales(query['id']).subscribe((res) => {
        this.saleData = res.products;
        this.data = res;
        console.log(this.data);
        this.qSaleForm.controls['name']?.setValue(res.name);
        this.qSaleForm.controls['id']?.setValue(res.id);
        res.products.forEach((product: any) => {
          const availProduct = new FormControl(product.id);
          this.qSaleproducts.push(availProduct);
        });

        this.productData.getProducts().subscribe((res) => {
          this.allProductData = res;
        });
      });
    });
  }
  public deleteProduct(id: number) {
    this.saleData.splice(id, 1);
    this.qSaleproducts.removeAt(id);
  }
  addProducts() {
    this.addNew = true;
    this.showProducts = false;
  }
  showFunction() {
    this.addNew = false;
    this.showProducts = true;
  }
  searchProduct() {
    const value = this.qSaleForm.controls['productName'].value;
    if (value) {
      this.allProducts = this.allProductData.filter(
        (data) =>
          data.name.toLowerCase().includes(value.toLowerCase()) &&
          data.stock > 0
      );
    } else {
      this.allProducts = [];
    }
  }
  updateSales() {
    const data = this.qSaleForm.value;
    this.api.updateQsales(this.qSaleForm.value).subscribe((res) => {
      if (res) {
        this.toastr.showSuccess('updates successfull..');
        this.route.navigate(['/dashboard/sales/quicksales']);
        this.functionServ.sendClickEvent();
      }
    });
  }
  addToSale(product: Iproducts) {
    const productExist = this.qSaleproducts.controls.some(
      (control) => control.value == product.id
    );
    if (!productExist) {
      this.allProducts = [];
      this.selectedProducts?.push(product);
      const newProduct = new FormControl(product.id);
      this.qSaleproducts.push(newProduct);
    } else {
      this.toastr.showWarining('product already exist..');
    }
  }
  // public activateButton(): boolean {
  //   this.saleData.forEach((product: any) => {
  //     const products = this.qSaleproducts.controls.some(
  //       (control) => control.value == product.id
  //     );
  //     console.log(products);
  //   });
  //   return this.data?.name == this.qSaleForm?.controls['name'].value;
  // }
  removeSelectedProducts(index: number, product: Iproducts) {
    const indexValue = this.qSaleproducts.controls.findIndex(
      (obj) => obj.value == product.id
    );
    this.qSaleproducts.removeAt(indexValue);
    this.selectedProducts.splice(index, 1);
  }
}
