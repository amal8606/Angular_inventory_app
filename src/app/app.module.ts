import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import{LoginGuard} from './authentication/login,guard';
import { ShowPasComponent } from './show-pas/show-pas.component';
import{HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { apiService } from './http services/api.service';
import { SimpleProductComponent } from './simple-product/simple-product.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { notificationService } from './services/notification.service';
import { TokenInterceptor } from './authentication/token.interceptor';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ViewsalesComponent } from './viewsales/viewsales.component';
import { GenerateDataService } from './services/generate-data.service';


// import { tokenInterceptor } from './authentication/token.intercept';


@NgModule({
  declarations: [
    AppComponent,
    ShowPasComponent,
    SimpleProductComponent,
    HomeComponent,
    SidebarComponent,
    ViewsalesComponent
   
    
   

  

  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
ReactiveFormsModule,
HttpClientModule,
FormsModule,
BrowserAnimationsModule,
ToastrModule.forRoot({
  progressBar:true,
  timeOut:3000,
  positionClass:'toast-top-center',
  closeButton:true,
  preventDuplicates:true
  
}

)
  ],
  providers: [LoginGuard,apiService,notificationService,GenerateDataService,
    {provide:HTTP_INTERCEPTORS,useClass:TokenInterceptor,multi:true}
 ],
  bootstrap: [AppComponent]
})
export class AppModule { }
