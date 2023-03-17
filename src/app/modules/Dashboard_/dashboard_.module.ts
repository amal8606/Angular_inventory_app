import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Dashboard_RoutingModule } from './dashboard_-routing.module';
import { Dashboard_Component } from './dashboard_.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    Dashboard_Component,
    
  ],
  imports: [
    CommonModule,
    Dashboard_RoutingModule,
    ReactiveFormsModule,
    FormsModule,
 
   
  
    
  ]
})
export class Dashboard_Module {

 }
