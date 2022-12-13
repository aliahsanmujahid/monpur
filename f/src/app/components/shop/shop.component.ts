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
  @Input() favh = false;

  throttle = 0;
  distance = 1;
  page:number = 1;
  stopscroll  = false;
  noproduct = false;

  imglink = environment.imgUrl;
  userid: string;
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

    this.userid = this.accountService.getuserid()

    this.basketService.basket$.subscribe(res =>{
      // console.log("basket",res);
    });
    this.accountService.currentUser$.subscribe(res =>{
      this.Activeuser = res;
    });



    if(this.route.params){
      this.route.params.subscribe(params => {

        if (Object.keys(params).length === 0) {
          this.params = 0;
          this.products = [];
          this.getProducts();
        }else{
          this.params = params;
          this.products = [];
          this.paramsproducts(this.sortby);
        }

      });
    }

  }


  addtofav(id){
    this.productService.addfav(this.userid,id).subscribe(res => {
      console.log("addfav",res);
    });
  }

  onScroll(): void {
    if(this.stopscroll == false){
      if(this.params.fav){
        this.productService.getfavp(this.userid,++this.page).subscribe( res =>{
              this.products.push(...res);
              console.log("onScroll",res);
              if(res.length == 0 || res == null || res.length < 10){
               this.stopscroll = true;
               this.noproduct = true;
              }else{
                this.noproduct = false;
                this.stopscroll = false;
              }
        }),
        error => {
        };
      }
    }
    console.log("throttle distance",this.throttle,this.distance,"+",this.page);
  }

  getProducts(){
   this.products = [];
     this.productService.getallproducts(this.sortby).subscribe( res =>{
       this.products = res;
       console.log("getProducts",res);
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
      this.paramsproducts(this.sortby);
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





  paramsproducts(sortby){

    if(this.params.cate){
      console.log("cate params",this.params.cate);
      this.productService.getcateproducts(this.params.cate,sortby).subscribe( res =>{
        this.products = res;
        console.log("this.products",res);
      }),
      error => {

      };
    }
    if(this.params.subcate){
      // console.log("search params",params.search);
      this.productService.getsubcateproducts(this.params.subcate,sortby).subscribe( res =>{
        this.products = res;
        console.log("this.products",res);
      }),
      error => {

      };
    }
    if(this.params.search){
      // console.log("search params",params.search);
      this.productService.searchProducts(this.params.search,sortby).subscribe( res =>{
        this.products = res;
        console.log("this.products",res);
      }),
      error => {

      };
    }
    if(this.params.fav){
      this.filters = false;
      this.favh = true;
      this.productService.getfavp(this.userid,this.page).subscribe( res =>{
        this.products = res;
        console.log("this.fav ",res);
        if(res.length == 0 || res == null || res.length < 10){
          this.stopscroll = true;
          this.noproduct = true;
         }else{
           this.noproduct = false;
           this.stopscroll = false;
         }
      })
    }
  }

}
