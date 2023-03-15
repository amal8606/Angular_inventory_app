import {Injectable} from '@angular/core';
import { CanActivate } from '@angular/router';
@Injectable({
    providedIn:'root',
})
export class LoginGuard implements CanActivate{
constructor(){}
canActivate():boolean{
 const loggedIn=localStorage.getItem('login');
 if(loggedIn){
    return false;
 }
 else{
    return true;
 }
}
}