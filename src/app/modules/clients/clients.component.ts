import { HttpClient } from '@angular/common/http';
import { Component, OnInit, SimpleChanges } from '@angular/core';
import { PaginationComponent } from 'src/app/pagination/pagination.component';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { notificationService } from 'src/app/services/notification.service';
import { apiService } from 'src/app/http services/api.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
  constructor(
    private http: HttpClient,
    private toastr: notificationService,
    private api: apiService
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
  get pages(): number[] {
    const pages = [];
    for (let i = 1; i <= this.total; i++) {
      pages.push(i);
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
          this.api.getApi('clients').subscribe({
            next: (response: any) => {
              console.log(response);
              this.totalData=response.length
              this.clients$ = of(response);
            },
            complete: () => {},
          });
        }
      });
    }
  }
}
