import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, Subscription } from 'rxjs';
import { apiService } from 'src/app/http services/api.service';
import { GetFunctionService } from 'src/app/services/get-function.service';
import { notificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html'

})
export class ClientsComponent implements OnInit {
  constructor(
    private readonly http: HttpClient,
    private readonly toastr: notificationService,
    private readonly api: apiService,
    private readonly functionServ:GetFunctionService,
    private readonly route:ActivatedRoute,
    private readonly navigate:Router
  ) {}
  public clients$!: Observable<any>;
  currentPage: number = 1;
  pageSize: number = 4;
  totalData!: number;
openModel=false;
  toOpenModal2 = false;
  public url = 'https://api-sales-app.josetovar.dev/clients';

  public clickEventSubscription:Subscription=this.functionServ.getClickEvent().subscribe(()=>{
    this.getClients()
  })
  pageChange(page:number){
    this.currentPage=page;
  }
  createClient = new FormGroup({
    id: new FormControl(''),
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    created_at:new FormControl(''),
    address: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    country: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    updated_at: new FormControl(''),
  });

  enableEdit(client: any) {
    this.toOpenModal2 = true;
    this.createClient.setValue(client)
    console.log(this.createClient)
  }
  editData() {
    const body = this.createClient.value;
    this.http.put(`${this.url}`, body).subscribe({
      next: (response) => {
        if (response) {
          console.log(response);
          this.toastr.showSuccess('updation successfull');
          this.api.getApi('clients').subscribe({
            next: (response: any) => {
              console.log(response);
              this.clients$ = of(response);
            },
            complete: () => {
              this.toOpenModal2 = false;
            },
          });
        }
      },
      error: (error) => {
        this.toastr.showError(error);
      },
      complete: () => {
        this.createClient.reset();
      },
    });
  }
  closeModal() {
    this.toOpenModal2 = false;
    this.createClient.reset();
  }
  ngOnInit(): void {
    this.getClients();
  }
  private getClients() {
    this.clients$ = this.http.get<{
      id: Number;
      first_name: string;
      last_name: string;
      address: string;
      city: string;
      state: string;
      country: string;
      phone: string;
      email: string;
    }>(this.url);
    this.clients$.subscribe((client) => {
      console.log(client)
      this.totalData = client.length;
    });
  }



  deleteRow(id: number) {
    if (confirm('Are you sure, want to delete the field ?..')) {
      this.http.delete(`${this.url}/${id}`).subscribe((response: any) => {
        if (response) {
          this.toastr.showSuccess('deleted successfully...');
        this.getClients()
        }
      });
    }
  }
}
