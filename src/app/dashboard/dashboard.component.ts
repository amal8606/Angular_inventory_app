import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { apiService } from '../http services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  constructor(private api:apiService,private http:HttpClient){

  }
  disable:boolean=false;
  buttonView:boolean=true;
  new_stock!:number;
userData:any=[];
endpoint='products'
url='https://63be61a4585bedcb36ac081a.mockapi.io/products'
ngOnInit(): void {

  this.api.getApi(this.endpoint).subscribe((response:any)=>{
    console.log(response)
    this.userData=response;
  })
}
deleteRow(id:number){
this.http.delete(`${this.url}/${id}`).subscribe((response:any)=>{
  if(response){
   this.api.getApi(this.endpoint).subscribe((response:any)=>{
    this.userData=response;
  })
  }
  

})
console.log(id)
}
}
