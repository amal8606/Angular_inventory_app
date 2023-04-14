import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from './components/pagination/pagination.component';
import { paginationPipe } from './pipes/pagination.pipe';

@NgModule({
 imports:      [ CommonModule ],
 declarations: [paginationPipe,PaginationComponent],
 exports:      [ paginationPipe,PaginationComponent,
                 CommonModule, FormsModule ]
})
export class SharedModule { }