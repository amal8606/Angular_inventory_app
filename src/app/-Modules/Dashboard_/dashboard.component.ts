import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html'
   
  })
  export class DashboardComponent {
    constructor(private readonly route:Router){

    }
    changeStatus(){
        if(confirm('Do want to log out?')){
          this.route.navigate(['login'])
          localStorage.clear();
        }else{
          console.log("don't want to log out")
          this.route.navigateByUrl(this.route.url)
        }
       
        
      }
  }