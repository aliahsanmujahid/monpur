import {  NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
import { ProductviewComponent } from './components/productview/productview.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SellerproductComponent } from './components/sellerproduct/sellerproduct.component';
import { OrderComponent } from './components/order/order.component';
import { HasRoleDirective } from './_directives/has-role.directive';
import { CategoryComponent } from './components/category/category.component';
import { ChatComponent } from './components/chat/chat.component';
import { SearchComponent } from './components/search/search.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { CartComponent } from './components/cart/cart.component';
import { PaymentComponent } from './components/payment/payment.component';
import { NgxPayPalModule } from 'ngx-paypal';
import { NgxEditorModule } from 'ngx-editor';
import { ShopComponent } from './components/shop/shop.component';
import { FooterComponent } from './components/footer/footer.component';
import { ManageorderComponent } from './components/manageorder/manageorder.component';
import { PaymentmanageComponent } from './components/paymentmanage/paymentmanage.component';
import { UsermanageComponent } from './components/usermanage/usermanage.component';
import { CopunsComponent } from './components/copuns/copuns.component';
import { SlidermanageComponent } from './components/slidermanage/slidermanage.component';
import { MobilecateComponent } from './components/mobilecate/mobilecate.component';
import { FootermanageComponent } from './components/footermanage/footermanage.component';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ShipingComponent } from './components/shiping/shiping.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MessageboxComponent } from './components/messagebox/messagebox.component';
import { ReviewmanageComponent } from './components/reviewmanage/reviewmanage.component';
import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule
} from '@abacritt/angularx-social-login';
import { SendboxComponent } from './components/sendbox/sendbox.component';
import { PrintComponent } from './components/print/print.component';
import { NgxPrintModule } from 'ngx-print';




@NgModule({
  declarations: [
    AppComponent,
    HasRoleDirective,
    MessageComponent,
    LoginComponent,
    SignupComponent,
    NavbarComponent,
    HomeComponent,
    CreateproductComponent,
    ProductviewComponent,
    ForgotComponent,
    DashboardComponent,
    ProfileComponent,
    SellerproductComponent,
    OrderComponent,
    CategoryComponent,
    ChatComponent,
    SearchComponent,
    CarouselComponent,
    CartComponent,
    PaymentComponent,
    ShopComponent,
    FooterComponent,
    ManageorderComponent,
    PaymentmanageComponent,
    UsermanageComponent,
    CopunsComponent,
    SlidermanageComponent,
    MobilecateComponent,
    FootermanageComponent,
    ShipingComponent,
    MessageboxComponent,
    ReviewmanageComponent,
    SendboxComponent,
    PrintComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    NgxSpinnerModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPayPalModule,
    NgxEditorModule,
    NgxPrintModule,
    CarouselModule,
    InfiniteScrollModule,
    SocialLoginModule,
    TimeagoModule.forRoot()
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},

    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '474827520742-8c634isin562c1dde1o9b8gikh786nak.apps.googleusercontent.com'
            )
          }
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
