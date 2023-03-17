import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { paginationPipe } from '../pipes/pagination.pipe';


@NgModule({
  declarations: [
    paginationPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    paginationPipe,
    CommonModule
  ]
})
export class SharedModule { }