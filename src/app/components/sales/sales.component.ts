import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { apiService } from 'src/app/http services/api.service';
import { GetFunctionService } from 'src/app/services/get-function.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
})
export class SalesComponent {
  constructor(public apiService:apiService,
    public readonly http:HttpClient,
    public readonly functionServ:GetFunctionService,
    private readonly router:Router){

  }

 

}
