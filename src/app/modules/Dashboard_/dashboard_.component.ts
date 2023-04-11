import { Component } from "@angular/core";
import { Router } from "@angular/router";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard_.component.html',
   styleUrls:['./Dashboard_.component.scss']
   
  })
  export class Dashboard_Component {
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