import { quickSalesApiService } from '@Api/Sales/quickSale.service';
import { salesApiService } from '@Api/Sales/salesApi.service';
import { GenerateDataService } from '@Services/generate-data.service';
import { GetFunctionService } from '@Services/get-function.service';
import { notificationService } from '@Services/notification.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Iclient } from 'src/app/-Shared/interfaces/client.interface';
import { Iproducts } from 'src/app/-Shared/interfaces/product.interface';
@Component({
  selector: 'app-create-sales',
  templateUrl: './create-sales.component.html',
})
export class CreateSalesComponent implements OnInit , OnDestroy{
  constructor(
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
  clients!:any[];
  products!: any[];
  clientList!:any[];
  productList!:any[];

  Showtable = false;
  searchProductValue!: string;

  searchValue!: string;
  productValue!: string;
  
  public saleForm: FormGroup = new FormGroup({
    client_id: new FormControl(null, Validators.required),
    clientName: new FormControl(''),
    productName: new FormControl(''),
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
    this.updateTotal()
  }
 public minusQuantity(index:number){

this.saleProducts.controls[index].patchValue({
  quantity:this.saleProducts.at(index).get('quantity')?.value-1
})
this.updateTotal()
  }
public plusQuantity(index:number){

  this.saleProducts.controls[index].patchValue({
    quantity:this.saleProducts.at(index).get('quantity')?.value+1
    
  })
  
  this.updateTotal()
  }
 public reDirect(){
this.router.navigate(['dashboard/clients'],{queryParams:{source:'new'}})
  }
  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe(params=>{
    
      if(params['quicksale']){
        this.addSale=true;
        this.showClient=true;
        this.qApi.getSinglequickSales(`${params['quicksale']}`).subscribe(res=>{
          this.updateTotal()
          res.products.forEach((item:any)=>{
          this.addProductTolist(item)
           

          })
        })
      }
    })
   this.dataServ.getClients().subscribe(clients=>{
    this.clients=clients
   });
  this.dataServ.getProducts().subscribe(products=>{
    this.products=products
  });

  

  }

  public searchName() {
   const value=this.saleForm.controls['clientName'].value
   this.showDiv=true
      this.clientList = this.clients.filter((client: Iclient) =>
            client.first_name
              .toLowerCase()
              .includes(value.toLowerCase())
          );
 


  }

 public selectClient(client:Iclient) {
    this.showDiv = false;
    this.saleForm.get('client_id')?.setValue(client.id);
    this.saleForm.get('clientName')?.setValue(`${client.first_name} ${client.last_name}`);
    this.viewProducts = true;
  }
  public sendNewSales() {
    
    this.api.addSales(this.saleForm.value).subscribe({
      next: () => {
        this.toastr.showSuccess('New sale added successFully');
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

 public closeSales() {
    this.addSale = false;
    this.showDiv = false;
    this.searchValue = '';
    this.saleForm.reset();
    this.saleProducts.clear();
    this.Showtable = false;
    this.viewProducts = false;
    this.showClient=false;
  }
 public showtable() {
const value=this.saleForm.controls['productName'].value
    this.Showtable = true;
      this.productList = this.products.filter(
            (product: any) =>
              product.active == true &&
              product.stock>0&&
              product.name
                .toLowerCase()
                .includes(value.toLowerCase())
          );
  }
  public clearCart() {
    this.saleProducts.clear();
  }

 public updateTotal(){

    this.totalamount=this.saleProducts.controls.reduce((acc:any,val:any)=>{
      acc=acc+ val.value.quantity * val.value.price;
return acc
    },0)

    }
    ngOnDestroy(): void {
      this.saleProducts.clear();
    }
  }

