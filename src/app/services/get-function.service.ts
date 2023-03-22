import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetFunctionService {

  constructor() { }

  private subject=new Subject<any>();
  sendClickEvent(){
    this.subject.next(true);
  }
  getClickEvent(){
    return this.subject.asObservable();
  }
}
