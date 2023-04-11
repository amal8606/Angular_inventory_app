import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../pagination/pagination.component';
import { paginationPipe } from '../pipes/pagination.pipe';


@NgModule({
  declarations: [
    paginationPipe,
    PaginationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    paginationPipe,
    CommonModule,
    PaginationComponent
  ]
})
export class SharedModule { }