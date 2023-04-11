// import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  title = 'reactiveForms';
  constructor(private route:Router){

   
  }
  isFixed=false;
  ToShowNavbar=true;

  @HostListener('window:scroll',[])
  onWindowScroll(){
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (scrollPosition >= 500) {
      this.isFixed = true;
    } else {
      this.isFixed = false;
    }

  }
  @ViewChild('myDiv') myDiv!:ElementRef<HTMLElement>;
  changeStatus(){
    if(confirm('Do want to log out?')){
      this.route.navigate(['login'])
  
      localStorage.clear();
    }else{
      console.log("don't want to log out")
      this.route.navigateByUrl(this.route.url)
    }
   
    
  }
  showNavbar():any{
    const showNav=localStorage.getItem('login')
   if(showNav){
    return false;
   }
   else{
    return true;
   }
  }

}
