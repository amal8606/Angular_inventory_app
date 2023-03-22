import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, of, Subscription } from 'rxjs';
import { apiService } from 'src/app/http services/api.service';
import { GetFunctionService } from 'src/app/services/get-function.service';
import { notificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
  constructor(
    private readonly http: HttpClient,
    private readonly toastr: notificationService,
    private readonly api: apiService,
    private readonly functionServ:GetFunctionService
  ) {}
  public clients$!: Observable<any>;
  currentPage: number = 1;
  pageSize: number = 4;
  totalData!: number;

  toOpenModal2 = false;
  public url = 'https://api-sales-app.josetovar.dev/clients';
  get total(): number {
    return Math.ceil(this.totalData / this.pageSize);
  }
  public clickEventSubscription:Subscription=this.functionServ.getClickEvent().subscribe(()=>{
    this.getClients()
  })
  get pages(): any[] {
    const pagesToShow = 3;
    const startPage = Math.max(
      1,
      this.currentPage - Math.floor(pagesToShow / 2)
    );
    const endPage = Math.min(this.total, startPage + pagesToShow - 1);
    const firstPage = 1;
    const lastPage = this.total;

    const pages = startPage > firstPage ? [firstPage] : [];

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    if(firstPage<startPage-1){
      pages.splice(1,0,-1)
    }
    if (endPage < lastPage - 1) {
      pages.push(-1);
    }

    if (endPage < lastPage) {
      pages.push(lastPage);
     
    }

    return pages;
  }
  gotoPage(page: number) {
    this.currentPage = page;
  }

  prevBtn() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }
  nxtBtn() {
    if (this.currentPage <= this.total) {
      this.currentPage++;
    }
  }
  createClient = new FormGroup({
    id: new FormControl(''),
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    address: new FormControl(''),
    city: new FormControl(''),
    state: new FormControl(''),
    country: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
  });

  enableEdit(client: any) {
    this.createClient.setValue(client);
    this.toOpenModal2 = true;
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
