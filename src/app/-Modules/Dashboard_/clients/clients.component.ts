import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription, of } from 'rxjs';
import { clientApiService } from 'src/app/-Core/Http/Api/clients/clientApi.service';
import { GetFunctionService } from 'src/app/-Core/authentication/services/get-function.service';
import { notificationService } from 'src/app/-Core/authentication/services/notification.service';
import { Iclient } from 'src/app/-Shared/interfaces/client.interface';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html'

})
export class ClientsComponent implements OnInit {
  constructor(
    private readonly http: HttpClient,
    private readonly toastr: notificationService,
    private readonly api: clientApiService,
    private readonly functionServ:GetFunctionService,
    private readonly route:ActivatedRoute,
    private readonly navigate:Router
  ) {}
  public clients$!: Observable<any>;
  public currentPage: number = 1;
  public pageSize: number = 4;
  public totalData!: number;
  public openModel=false;
  public toOpenModal2 = false;

  public clickEventSubscription:Subscription=this.functionServ.getClickEvent().subscribe(()=>{
    this.getClients()
  })
  public pageChange(page:number){
    this.currentPage=page;
  }
  public createClient = new FormGroup({
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

  public enableEdit(client: any) {
    this.toOpenModal2 = true;
    this.createClient.setValue(client)

  }
  public editData() {
    const body = this.createClient.value;
    this.api.updateClient(body).subscribe({
      next: (response) => {
        if (response) {
          console.log(response);
          this.toastr.showSuccess('updation successfull');
          this.api.getApi().subscribe({
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
  public closeModal() {
    this.toOpenModal2 = false;
    this.createClient.reset();
  }
  ngOnInit(): void {
    this.getClients();
  }
  private getClients() {
    this.clients$ = this.http.get<Iclient>(this.api.url);
    this.clients$.subscribe((client) => {
      this.totalData = client.length;
    });
  }



  public deleteRow(id: number) {
    if (confirm('Are you sure, want to delete the field ?..')) {
      this.api.deleteClient(id).subscribe((response: any) => {
        if (response) {
          this.toastr.showSuccess('deleted successfully...');
        this.getClients()
        }
      });
    }
  }
}
