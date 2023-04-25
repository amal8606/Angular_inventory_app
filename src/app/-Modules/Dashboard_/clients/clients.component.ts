import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subscription, of } from 'rxjs';
import { clientApiService } from '@Api/clients/clientApi.service';
import { GetFunctionService } from '@Services/get-function.service';
import { notificationService } from '@Services/notification.service';
import * as Papa from 'papaparse';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html'

})
export class ClientsComponent implements OnInit {
  constructor(
    private readonly toastr: notificationService,
    private readonly api: clientApiService,
    private readonly functionServ:GetFunctionService,
  ) {}
  public clients$!: Observable<any>;
  public currentPage: number = 1;
  public pageSize: number = 4;
  public totalData!: number;
  public openModel=false;
  public toOpenModal2 = false;
  public fileToUpload!:File;

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
        
          this.toastr.showSuccess('updation successfull');
          this.api.getApi().subscribe({
            next: (response: any) => {
            
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
    this.clients$ = this.api.getApi();
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
  public onFileChange(event:any){
    this.fileToUpload=event.target.files.item(0)
    
  }
  importClient(){
    this.api.importCilent(this.fileToUpload).subscribe({
     next:(res)=>{
console.log(res)
this.toastr.showSuccess('new Cilents added successfully')
this.getClients()
     }
    })
  }
  downloadData(){
    this.clients$.subscribe(data=>{
      const csvData:any=Papa.unparse(data)
      const blob=new Blob([csvData],{ type: 'text/csv' });
      const Url=window.URL.createObjectURL(blob)
      const link = document.createElement('a');
      link.setAttribute('href',Url);
      link.setAttribute('download', 'data.csv');
      link.click();
    })
  }
}
