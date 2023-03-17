import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients.component';
import { SharedModule } from '../shareModule.module';

@NgModule({
  declarations: [
    ClientsComponent,
   
  ],
  
  imports: [
    CommonModule,
    ClientsRoutingModule,
    SharedModule
    
  ]
})
export class ClientsModule { }
