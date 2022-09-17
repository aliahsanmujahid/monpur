import { ProfileComponent } from './components/profile/profile.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ForgotComponent } from './components/forgot/forgot.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ProductviewComponent } from './components/productview/productview.component';
import { ProductsComponent } from './components/products/products.component';
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
  {path: 'msg',  component: MessageComponent},

  {path: 'msg',  component: MessageComponent},
  {path: 'dash',  component: DashboardComponent},
  {path: 'profile',  component: ProfileComponent},

  {path: 'createproduct',  component: CreateproductComponent},
  {path: 'products',  component: ProductsComponent},
  {path: 'sellerproducts',  component: ProductsComponent},
  {path: 'checkout',  component: CheckoutComponent},

  {path: 'edit/:id',  component: CreateproductComponent},
  {path: 'product/:id',  component: ProductviewComponent, resolve: {product: ProductDetailedResolver}},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
