import { Component } from '@angular/core';
import { user } from './fake-user';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { notificationService } from '../services/notification.service';

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
  public url = 'https://63be61a4585bedcb36ac081a.mockapi.io/users';
  public login() {
    const { email, password } = this.loginForm.value;
    this.Httpservice.get(this.url).subscribe((response: any) => {
      if (response) {
        response.map((users: any) => {
          if (users.email == email && users.password == password) {
            localStorage.setItem('loggedIn', 'true');
            this.notification.showSuccess('login success..!')
            this.routeVal.navigate(['dashboard']);
            console.log('this.routeVal.url');
          
          } else {
           this.toShow=true;
          }
        });
      }
    });
    // const { email, password } = this.loginForm.value;
    // console.log(email);
    // user.map((users) => {
    //   if (users.email == email && users.password == password) {
    //      localStorage.setItem('loggedIn', 'true');
    //     this.routeVal.navigate(['dashboard']);
    //   } else {
    //     this.toShow=true
    //     console.log('please enter valid credentials');
    //   }
    // });
  }
}
