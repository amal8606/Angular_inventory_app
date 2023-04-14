import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GetFunctionService } from 'src/app/-Core/authentication/services/get-function.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html'
})
export class SalesComponent {
  constructor(
    public readonly http:HttpClient,
    public readonly functionServ:GetFunctionService,
    private readonly router:Router){

  }

 

}
