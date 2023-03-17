import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PaginationComponent } from 'src/app/pagination/pagination.component';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { notificationService } from 'src/app/services/notification.service';
import { apiService } from 'src/app/http services/api.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  constructor(private http:HttpClient,
    private toastr:notificationService,
    private api:apiService){}
  public clients$!:Observable<any>;
   currentPage: number=1;
    pageSize: number=4;
    totalData!: number;
  public url='https://api-sales-app.josetovar.dev/clients'
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
    console.log(page)
    this.currentPage=page;
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
ngOnInit(): void {
  this.clients$=this.http.get<{
    id: Number,
    first_name: string,
    last_name: string,
    address: string,
    city: string,
    state: string,
    country: string,
    phone: string,
    email: string
}>(this.url)
this.clients$.subscribe(client=>{
  this.totalData=client.length
})
}
deleteRow(id: number) {
  if (confirm('Are you sure, want to delete the field ?..')) {
    this.http.delete(`${this.url}/${id}`).subscribe((response: any) => {
      if (response) {

        this.toastr.showSuccess('deleted successfully...');
        this.api.getApi('clients').subscribe({
          next: (response: any) => {
            console.log(response);
            this.clients$ = of(response);
          },
          complete: () => {
            
          },
        });
      }
    });
  }
}
}
