import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ColorPickerModule } from 'ngx-color-picker';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MessageComponent } from './components/message/message.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { TimeagoModule } from 'ngx-timeago';
import { CreateproductComponent } from './components/createproduct/createproduct.component';
import { JwtInterceptor } from './_interceptors/jwt.interceptor';
import { ProductsComponent } from './components/products/products.component';
import { ProductviewComponent } from './components/productview/productview.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SellerproductComponent } from './components/sellerproduct/sellerproduct.component';

@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    HomeComponent,
    CreateproductComponent,
    ProductsComponent,
    ProductviewComponent,
    CheckoutComponent,
    ForgotComponent,
    DashboardComponent,
    ProfileComponent,
    SellerproductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ColorPickerModule,
    TimeagoModule.forRoot()
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
