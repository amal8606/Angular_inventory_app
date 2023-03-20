import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients.component';
import { SharedModule } from '../shareModule.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NewClientComponent } from 'src/app/new-client/new-client.component';

@NgModule({
  declarations: [
    ClientsComponent,
    NewClientComponent

   
  ],
  
  imports: [
    CommonModule,
    ClientsRoutingModule,
    SharedModule,ReactiveFormsModule
    
  ]
})
export class ClientsModule { }
