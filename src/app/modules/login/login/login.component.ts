import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { notificationService } from '../../../services/notification.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private readonly routeVal: Router,
    private readonly notification:notificationService,
    private readonly Httpservice: HttpClient,
    private readonly toastr:ToastrService
  ) {}
  public loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl(
      '',
      Validators.compose([Validators.minLength(8), Validators.required])
    ),
  });
  toShow: boolean = false;
  public url = 'https://api-sales-app.josetovar.dev/login';
  public login() {
    const { email, password } = this.loginForm.value;
    console.log(this.loginForm.value)
    this.Httpservice.post(this.url,this.loginForm.value).subscribe({
      next:(response: any) => {
        if (response) {
          console.log(response)
          // response.map((users: any) => {
          //   // if (users.email == email && users.password == password) {
              localStorage.setItem('access_token',
               JSON.stringify(response.access_token));
               localStorage.setItem('login','true')
              this.notification.showSuccess('login success..!')
              this.routeVal.navigate(['dashboard']);
    
            
           
        }
      },
      error:()=>{
        this.toShow=true
        this.toastr.error("Invalid email/ password....")
      }
    });
   
  }
}
