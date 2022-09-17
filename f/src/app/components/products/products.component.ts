import { BasketService } from './../../_services/basket.service';
import { ProductService } from './../../_services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products: any = [];
  Activeuser: User;

  constructor(private route: ActivatedRoute,public productService: ProductService,
    public accountService: AccountService,public basketService: BasketService) { }

  ngOnInit(): void {
    this.basketService.basket$.subscribe(res =>{
      console.log("basket",res);
    });
    this.accountService.currentUser$.subscribe(res =>{
      this.Activeuser = res;
    });

    this.getProducts();

  }




  getProducts(){
    this.products = [];
     this.productService.getallproducts().subscribe( res =>{
       this.products = res;

     }),
     error => {
      console.log(error)
     };
  }

  addItemToBasket(item){
     if(this.Activeuser){
      if (this.Activeuser.role == 'admin'
    || this.Activeuser.role == 'seller'){
      console.log("Seller/admin Can,t buy product");
    }else{
      this.basketService.addItemToBasket(item);
    }
    }else{
      this.basketService.addItemToBasket(item);
    }
  }

}
