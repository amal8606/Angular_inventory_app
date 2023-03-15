// import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'reactiveForms';
  constructor(private route:Router){

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
