import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { notificationService } from 'src/app/services/notification.service';
import { GetFunctionService } from '../services/get-function.service';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.scss']
})
export class NewClientComponent {
  constructor(
    private readonly http: HttpClient,
    private readonly toastr: notificationService,
    private readonly functinalServ:GetFunctionService
  ) {}
  @Input()
  clients$!:Observable<any>;
  @Input()
  totalData!:number;
  toOpenModel = false;
  public url = 'https://api-sales-app.josetovar.dev/clients';

  createClient = new FormGroup({
    first_name: new FormControl('',Validators.required),
    last_name: new FormControl('',Validators.required),
    address: new FormControl('',Validators.required),
    city: new FormControl('',Validators.required),
    state: new FormControl('',Validators.required),
    country: new FormControl('',Validators.required),
    phone: new FormControl('',Validators.required),
    email: new FormControl('',Validators.required),
  });
  openModel() {
    this.toOpenModel = true;
    
  }
  createNewClient() {
    const body = this.createClient.value;
    console.log(body);
    this.http.post(`${this.url}`, body).subscribe({
      next:(response) => {
        if (response) {
          console.log(response)
          this.toastr.showSuccess(
            `New client with name ${body.first_name} added successfully`
          );
  this.functinalServ.sendClickEvent()
        }
      },
      error:()=>{
        this.toastr.showError("Something went wrong, try again later");
      },
      complete:()=>{
        this.createClient.reset();
        this.toOpenModel=false;
      }
    });
  }
}
