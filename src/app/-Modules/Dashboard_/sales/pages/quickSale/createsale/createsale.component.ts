import { quickSalesApiService } from '@Api/Sales/quickSale.service';
import { GenerateDataService } from '@Services/generate-data.service';
import { notificationService } from '@Services/notification.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Iproducts } from 'src/app/-Shared/interfaces/product.interface';

@Component({
  selector: 'app-createsale',
  templateUrl: './createsale.component.html',
})
export class CreatesaleComponent implements OnInit{
constructor(private readonly toastr:notificationService,
  private readonly dataServ:GenerateDataService,
  private readonly api:quickSalesApiService,
  private readonly notification:notificationService){

}
public quickSaleProducts!:any[];
public products!:any[];
public addSale=false;
public showDiv=false;
public productList!:any[];
public quicksaleForm: FormGroup = new FormGroup({
  name: new FormControl('', Validators.required),
  productName:new FormControl(''),
  products: new FormArray([], Validators.required),
});
get quicksaleProducts(): FormArray {
  return this.quicksaleForm.controls['products'] as FormArray;
}
public addProductTolist(product:Iproducts) {

  const productExist=this.quicksaleProducts.controls.some((control)=>
  control.value==product.id)
if(!productExist){
  const newProductControl = new FormControl(product.id);
    this.quicksaleProducts?.push(newProductControl);
    this.showDiv=false;
    this.quickSaleProducts?.push(product)


   
  }else{
    this.notification.showWarining("product already added")
  }
  


}
public deleteProduct(index:number){
  this.quickSaleProducts.splice(index,1);
  this.quicksaleProducts.removeAt(index)
  const value=this.quicksaleForm.value;
  console.log(value)
  
}
public clear(){
  this.quicksaleForm.reset()
  this.quickSaleProducts=[];
}
public searchName() {
  this.showDiv = true;
  const value=this.quicksaleForm.controls["productName"].value
  this.productList = this.products.filter((product: any) =>
      product.name
          .toLowerCase()
          .includes(value.toLowerCase()),
      );
}

public sendNewSales(){
  const value=this.quicksaleForm.value;
  this.api.addQuickSale(value).subscribe({
    next:()=>{
      this.notification.showSuccess('New quick sale added successfully')
      this.addSale=false;
    },
    error:()=>{
      this.notification.showError('error')
    }
  })
}
public closeModal(){
  this.addSale=false;
  this.quickSaleProducts=[]
  this.quicksaleProducts.clear()
  this.quicksaleForm.reset()
}
ngOnInit(): void {
  this.dataServ.getProducts().subscribe(products=>{
this.products=products
  });
    
}
}
