import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { notificationService } from 'src/app/services/notification.service';
import { apiService } from 'src/app/http services/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.scss']
})
export class NewClientComponent {
  constructor(
    private http: HttpClient,
    private toastr: notificationService,
    private api: apiService
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
    this.http.post(`${this.url}`, body).subscribe((response) => {
      if (response) {
        console.log(response)
        this.toastr.showSuccess(
          `New client with name ${body.first_name} added successfully`
        );
        this.api.getApi('clients').subscribe({
          next: (response: any) => {
            console.log(response);
            this.totalData=response.length;
            this.clients$ = of(response);
          },
          complete: () => {
            this.toOpenModel=false
          },
        });
      }
    });
  }
}
