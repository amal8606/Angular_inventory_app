import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiService } from '../http services/api.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { notificationService } from '../services/notification.service';
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

  disable: boolean = false;
  buttonView: boolean = true;
  new_stock!: number;
  userData$!: Observable<any>;
  onEdit = false;
  endpoint = 'products';
  // switchForm = new FormGroup({
  //   enableEdit: new FormControl(false),
  // });
  public updateForm: FormGroup = new FormGroup({});
  url = 'https://63be61a4585bedcb36ac081a.mockapi.io/products';
  @ViewChild('editableSwitch') editableSwitch?:ElementRef<HTMLInputElement>;
  onchange(){
    console.log(this.editableSwitch?.nativeElement.checked)
  }
  ngOnInit(): void {
  //  const isEditable=this.editableSwitch.nativeElement.checked;

  
    this.userData$ = this.http.get<{
      id: number;
      product_name: string;
      price: number;
      avatar: string;
      stock: number;
    }>(this.url);

    this.userData$.subscribe((products) => {
      products.map((product: any) => {
        this.updateForm.addControl(
          `${product.id}`,
          new FormGroup({
            price: new FormControl(formatCurrency(product.price, 'en-US', '$')),
            stock: new FormControl(product.stock),
            enableEdit: new FormControl(false),
          })
          
        );
      
      });
    });
   
  }
  setFormatCurrency(product: any, event: any){
    const price = formatCurrency(
      this.getValueFromCurrency(event.target.value),
      'en_US',
      '$'
    );
    console.log(price)
  }
  getValueFromCurrency(value: string):number{
    let price :number;
    if(value.includes('$')){
      price=Number(value.substring(1).replaceAll(',',''))
    }else{
      price=Number(value.replaceAll(',',''))
    }
    console.log(price)
    return price
    

  }
  updateValue(product: any) {
    console.log(product);
    let newValues = {
      ...product,
      ...this.updateForm.controls[product.id].value,
    };
    console.log(newValues);

    this.api.updateSingleProduct(newValues).subscribe((response) => {
      this.toastr.showSuccess('Updated successfully...');
      console.log(response);
    });
  }

  deleteRow(id: number) {
    this.http.delete(`${this.url}/${id}`).subscribe((response: any) => {
      if (response) {
        this.toastr.showSuccess('deleted successfully...');
        this.api.getApi(this.endpoint).subscribe((response: any) => {
          console.log(response);
          this.userData$ = of(response);
        });
      }
    });
  }
  disableUpdateButton(product: any) {
 
    const { price, stock} = this.updateForm.controls[product.id].value;
    const formatPrice=formatCurrency(product.price,'en-US','$')
    console.log(price)

    return price==formatPrice && stock == product.stock;
  }
  disableEditing(product:any){
    const {enableEdit}= this.updateForm.controls[product.id].value;
return enableEdit
  }
}

