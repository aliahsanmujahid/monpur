import { MobilecateComponent } from './components/mobilecate/mobilecate.component';
import { ShopComponent } from './components/shop/shop.component';
import { PaymentComponent } from './components/payment/payment.component';
import { CartComponent } from './components/cart/cart.component';
import { SearchComponent } from './components/search/search.component';
import { ChatComponent } from './components/chat/chat.component';
import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ProductviewComponent } from './components/productview/productview.component';
import { CreateproductComponent } from './components/createproduct/createproduct.component';
import { HomeComponent } from './components/home/home.component';
import { MessageComponent } from './components/message/message.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ProductDetailedResolver } from './_resolvers/product-detailed.resolver';

const routes: Routes = [
  {path: '',  component: HomeComponent},
  {path: 'login',  component: LoginComponent},
  {path: 'signup',  component: SignupComponent},
  {path: 'forgot',  component: ForgotComponent},
  {path: 'chat',  component: MessageComponent},
  {path: 'search',  component: SearchComponent},

  {path: 'msg',  component: ChatComponent},
  {path: 'dash',  component: DashboardComponent},
  {path: 'profile',  component: ProfileComponent},

  {path: 'createproduct',  component: CreateproductComponent},
  {path: 'mobilecate',  component: MobilecateComponent},
  {path: 'shop',  component: ShopComponent},
  {path: 'cart',  component: CartComponent},
  {path: 'checkout',  component: CheckoutComponent},
  {path: 'payment/:id',  component: PaymentComponent},

  {path: 'product/:id',  component: ProductviewComponent, resolve: {product: ProductDetailedResolver}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
