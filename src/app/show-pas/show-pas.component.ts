import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { notificationService } from '../services/notification.service';
@Component({
  selector: 'app-show-pas',
  templateUrl: './show-pas.component.html',
  styleUrls: ['./show-pas.component.scss'],
})
export class ShowPasComponent {
  constructor(
    private readonly notification:notificationService,
    private readonly route: Router,
    private readonly Http: HttpClient
  ) {}
  password = '';
  showPass: boolean = false;
  showerror: boolean = false;
  public registerForm = new FormGroup({
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  public url = 'https://63be61a4585bedcb36ac081a.mockapi.io/users';
  getPassword() {
    const body = this.registerForm.value;
    console.log(body);
    this.Http.post(this.url, body).subscribe((response) => {
      if (response) {
        this.notification.showSuccess('Account created successfully..!')
        this.route.navigate(['login']);
      }
    });

    //   const {username,email} =this.formDetails.value;
    //   console.log(username)
    //   user.map((users)=>{
    //     if(users.username==username && users.email==email){
    //       this.password=users.password;
    //       this.showPass=true;
    //       this.showerror=false;
    //       console.log(this.password)
    //     }else{
    //       console.log("invalid userName or email")
    //       this.showerror=true;
    //       this.showPass=false;
    //     }
    //   })
    // }
  }
}
