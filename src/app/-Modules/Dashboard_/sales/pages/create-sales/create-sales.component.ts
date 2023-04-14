import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { salesApiService } from 'src/app/-Core/Http/Api/Sales/salesApi.service';
import { GenerateDataService } from 'src/app/-Core/authentication/services/generate-data.service';
import { GetFunctionService } from 'src/app/-Core/authentication/services/get-function.service';
import { notificationService } from 'src/app/-Core/authentication/services/notification.service';
import { quickSalesApiService } from 'src/app/-Core/Http/Api/Sales/quickSale.service';
import { Iproducts } from 'src/app/-Shared/interfaces/product.interface';
import { Iclient } from 'src/app/-Shared/interfaces/client.interface';
@Component({
  selector: 'app-create-sales',
  templateUrl: './create-sales.component.html',
})
export class CreateSalesComponent implements OnInit , OnDestroy{
  constructor(
    private readonly http: HttpClient,
    private readonly toastr: notificationService,
    private readonly functionServ: GetFunctionService,
    private readonly dataServ: GenerateDataService,
    private readonly router: Router,
    private readonly activeRoute:ActivatedRoute,
    private readonly api:salesApiService,
    private readonly qApi:quickSalesApiService

  ) {}
  totalamount!:any;
  showClient=false;
  viewProducts = false;
  addSale = false;
  info = false;
  showDiv = false;
  clients$!: Observable<any>;
  products$!: Observable<any>;
  Showtable = false;
  searchProductValue!: string;

  searchValue!: string;
  productValue!: string;

  public saleForm: FormGroup = new FormGroup({
    client_id: new FormControl(null, Validators.required),
    products: new FormArray([], Validators.required),
  });
  get saleProducts(): FormArray {
    return this.saleForm.controls['products'] as FormArray;
  }
  public addProductTolist(product:Iproducts) {
    const productExist=this.saleProducts.controls.some((control)=>
    control.value.id==product.id)
    if(!productExist){
      const newProduct: FormGroup = new FormGroup({
        price:new FormControl(product.price),
      name:new FormControl(product.name),
  stock:new FormControl(product.stock),
        id: new FormControl(product.id, Validators.required),
        quantity: new FormControl(1, [
          Validators.required,
          Validators.min(1),
          Validators.max(product.stock),
        ]),
      });
      this.saleProducts.push(newProduct);
  
      this.updateTotal()
    }
    else{
      this.toastr.showWarining("Product already added..")
    }

  }

  public removeProduct(productIndex: number) {
    this.saleProducts.removeAt(productIndex);
  }
  minusQuantity(index:number){

this.saleProducts.controls[index].patchValue({
  quantity:this.saleProducts.at(index).get('quantity')?.value-1
})
this.updateTotal()
  }
plusQuantity(index:number){

  this.saleProducts.controls[index].patchValue({
    quantity:this.saleProducts.at(index).get('quantity')?.value+1
    
  })
  
  this.updateTotal()
  }
  reDirect(){
this.router.navigate(['dashboard/clients'],{queryParams:{source:'new'}})
  }
  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params=>{
    
      if(params['quicksale']){
        this.addSale=true;
        this.showClient=true;
        this.qApi.getSinglequickSales(`${params['quicksale']}`).subscribe(res=>{
          this.updateTotal()
          // this.addProductTolist(res.products[0])
          res.products.forEach((item:Iproducts)=>{
          this.addProductTolist(item)
           

          })
        })
      }
    })
    this.clients$ = this.dataServ.getClients();
    this.clients$.subscribe();
    this.products$ = this.dataServ.getProducts();
    this.products$.subscribe();
  }
  searchName() {
    this.showDiv = true;
    this.clients$ = this.clients$.pipe(
      map((client) => {
        return client.filter((client: Iclient) =>
          client.first_name
            .toLowerCase()
            .includes(this.searchValue.toLowerCase())
        );
      })
    );
  }

  selectClient(clientId: number, value: string) {
    this.showDiv = false;
    this.saleForm.get('client_id')?.setValue(clientId);
    this.searchValue = value;
    this.viewProducts = true;
  }
  sendNewSales() {
    
    this.api.addSales(this.saleForm.value).subscribe({
      next: (response) => {
        this.toastr.showSuccess('New sale added successFully');
        console.log(response);
        this.saleForm.reset();
        this.addSale = false;
        this.searchValue = '';
        this.Showtable = false;
    this.saleForm.reset();
    this.showClient=false;


        this.functionServ.sendClickEvent();
      },
      error: (error) => {
        this.toastr.showError(error);
      },
    });
  }
  setProductId() {}
  closeSales() {
    this.addSale = false;
    this.showDiv = false;
    this.searchValue = '';
    this.saleForm.reset();
    this.saleProducts.clear();
    this.Showtable = false;
    this.viewProducts = false;
    this.showClient=false;
  }
  showtable() {
    this.Showtable = true;
    this,
      (this.products$ = this.products$.pipe(
        map((product) => {
          return product.filter(
            (product: any) =>
              product.active == true &&
              product.stock>0&&
              product.name
                .toLowerCase()
                .includes(this.searchProductValue.toLowerCase())
          );
        })
      ));
  }
  clearCart() {
    this.saleProducts.clear();
  }

  updateTotal(){

    this.totalamount=this.saleProducts.controls.reduce((acc:any,val:any)=>{
      acc=acc+ val.value.quantity * val.value.price;
return acc
    },0)

    }
    ngOnDestroy(): void {
      this.saleProducts.clear();
    }
  }

