import { AccountService } from './../../_services/account.service';
import { ActivatedRoute } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { environment } from 'src/environments/environment';
import { ProductService } from 'src/app/_services/product.service';
import { BasketService } from 'src/app/_services/basket.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  @Input() filters = true;

  imglink = environment.imgUrl;
  products: any = [];
  Activeuser: User;
  params: any = {};

  sortby = 5;
  sorts = [
    {
      id:1,
      name: 'New Arrivale',
    },
    {
      id:2,
      name: 'Popular',
    },
    {
      id:3,
      name: 'By Discolunt',
    },
    {
      id:4,
      name: 'By Ratting',
    },
    {
      id:5,
      name: 'Price High to Low',
    },
    {
      id:6,
      name: 'Price Low to High',
    }
  ]

  constructor(private route: ActivatedRoute,public productService: ProductService,
    public accountService: AccountService,public basketService: BasketService) { }

  ngOnInit(): void {
    this.basketService.basket$.subscribe(res =>{
      // console.log("basket",res);
    });
    this.accountService.currentUser$.subscribe(res =>{
      this.Activeuser = res;
    });



    if(this.route.params){
      this.route.params.subscribe(params => {

        window.scrollTo(0, 0);

        if (Object.keys(params).length === 0) {
          this.params = 0;
          this.products = [];
          this.getProducts();
        }else{
          this.params = params;
          this.products = [];
          this.paramsproducts(this.params,this.sortby);
        }

      });
    }

  }


  getProducts(){
   // this.products = [];
     this.productService.getallproducts(this.sortby).subscribe( res =>{
       this.products = res;
        console.log("all products",res)
     }),
     error => {
      console.log(error)
     };
  }

  onsortchange(){
    if(this.params === 0){
      console.log("this.params ", this.params);
      this.getProducts();
    }else{
      this.paramsproducts(this.params,this.sortby);
    }

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





  paramsproducts(params,sortby){

    if(params.cate){
      console.log("cate params",params.cate);
      this.productService.getcateproducts(params.cate,sortby).subscribe( res =>{
        this.products = res;
        console.log("this.products",res);
      }),
      error => {

      };
    }
    if(params.subcate){
      // console.log("search params",params.search);
      this.productService.getsubcateproducts(params.subcate,sortby).subscribe( res =>{
        this.products = res;
        console.log("this.products",res);
      }),
      error => {

      };
    }
    if(params.search){
      // console.log("search params",params.search);
      this.productService.searchProducts(params.search,sortby).subscribe( res =>{
        this.products = res;
        console.log("this.products",res);
      }),
      error => {

      };
    }
    if(params.fav){
      this.filters = false;
      this.getProducts();
    }
  }

}
