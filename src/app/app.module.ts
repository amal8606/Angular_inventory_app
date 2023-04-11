import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginGuard } from './authentication/login,guard';
import { TokenInterceptor } from './authentication/token.interceptor';
import { HomeComponent } from './home/home.component';
import { apiService } from './http services/api.service';
import { GenerateDataService } from './services/generate-data.service';
import { notificationService } from './services/notification.service';
import { ShowPasComponent } from './show-pas/show-pas.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { SimpleProductComponent } from './simple-product/simple-product.component';
import { ViewsalesComponent } from './viewsales/viewsales.component';


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
