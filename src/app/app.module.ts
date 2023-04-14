import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { SimpleProductComponent } from 'src/app/-Modules/Dashboard_/products/pages/simple-product/simple-product.component';
import { ViewsalesComponent } from 'src/app/-Modules/Dashboard_/sales/pages/viewsales/viewsales.component';
import { productApiService } from './-Core/Http/Api/Products/productsApi.service';
import { quickSalesApiService } from './-Core/Http/Api/Sales/quickSale.service';
import { salesApiService } from './-Core/Http/Api/Sales/salesApi.service';
import { authApiService } from './-Core/Http/Api/auth.service';
import { clientApiService } from './-Core/Http/Api/clients/clientApi.service';
import { LoginGuard } from './-Core/authentication/Guards/login,guard';
import { GenerateDataService } from './-Core/authentication/services/generate-data.service';
import { notificationService } from './-Core/authentication/services/notification.service';
import { TokenInterceptor } from './-Core/authentication/token.interceptor';
import { ShowPasComponent } from './-Modules/Auth/Register/show-pas.component';
import { HomeComponent } from './-Modules/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


// import { tokenInterceptor } from './authentication/token.intercept';


@NgModule({
  declarations: [
    AppComponent,
    ShowPasComponent,
    SimpleProductComponent,
    HomeComponent,
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
  providers: [LoginGuard,productApiService,notificationService,GenerateDataService,clientApiService,salesApiService,quickSalesApiService,authApiService,
    {provide:HTTP_INTERCEPTORS,useClass:TokenInterceptor,multi:true}
 ],
  bootstrap: [AppComponent]
})
export class AppModule { }
