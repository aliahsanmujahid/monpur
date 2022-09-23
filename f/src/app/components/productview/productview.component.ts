import { ReviewService } from './../../_services/review.service';
import { User } from 'src/app/_models/user';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/_models/product';
import { BasketService } from 'src/app/_services/basket.service';
import { ProductService } from 'src/app/_services/product.service';

@Component({
  selector: 'app-productview',
  templateUrl: './productview.component.html',
  styleUrls: ['./productview.component.css']
})
export class ProductviewComponent implements OnInit {

  constructor(private route: ActivatedRoute,private productService: ProductService,
    private basketService: BasketService,private reviewService: ReviewService) { }

  product: Product;
  cartProduct: Product = {
    id: 0,
    cateid:0,
    subcateid:0,
    name:'',
    details:'',
    orgprice:0,
    discprice:0,
    qty:0,
    file1:'',
    file2:'',
    file3:'',
    file4:'',
    file5:'',
    file6:'',
    file7:'',
    file8:'',
    sellerid:0,
    hascolor:'',
    hassize:'',
    colors : [],
    sizes : []
  };

  alert = false;
  malert = false;
  Activeuser: User;
  reviews: any = [];

  ngOnInit(): void {

    this.route.data.subscribe(data => {
      //  console.log(data);

      this.product = data['product'];
      //console.log("this.product",this.product);

      if(!this.product.colors || !this.product.sizes ){

          if(this.product.hascolor == "true"){
            console.log("setting color");
            this.productService.getcolors(this.product.id).subscribe( res => {
             this.product = {...this.product,"colors":res,"sizes":[]}
            // console.log(this.product);
            });
          }
          if(this.product.hassize == "true"){
            this.productService.getsizes(this.product.id).subscribe( res => {
              this.product = {...this.product,"sizes":res,"colors":[]}
             // console.log(this.product);
            });
          }
      }
      window.scrollTo(0, 0);
    })

    this.cartProduct = {
    id: this.product.id,
    cateid:this.product.cateid,
    subcateid:this.product.subcateid,
    name:this.product.name,
    details:this.product.details,
    orgprice:this.product.orgprice,
    discprice:this.product.discprice,
    qty:this.product.qty,
    file1:this.product.file1,
    file2:'',
    file3:'',
    file4:'',
    file5:'',
    file6:'',
    file7:'',
    file8:'',
    sellerid:this.product.sellerid,
    hascolor:'',
    hassize:'',
    colors : [],
    sizes : []
      };

  this.getreviews();

  }

  getreviews(){
  this.reviewService.getallreviews(this.product.id).subscribe( res =>{
    this.reviews = res;
    console.log(res);
  });
  }
  alerttoggle(){
    this.malert = !this.malert;
  }

  sendmessage(){


  }


  setColor(color, $event){
    if ($event.target.checked){
      this.cartProduct.colors = [];

      this.cartProduct.colors.push(color);
      this.alert = false;

    }
    else {
      const index = this.cartProduct.colors.indexOf(color);
      this.cartProduct.colors.splice(index, 1);

    }

  }
  setSize(size, $event){
    if ($event.target.checked){
      this.cartProduct.sizes = [];
      this.cartProduct.sizes.push(size);
      this.alert = false;
    }
    else {
      const index = this.cartProduct.sizes.indexOf(size);
      this.cartProduct.sizes.splice(index, 1);

    }

  }
  hidealert(){
    this.alert = !this.alert;
  }

  addItemToBasket(){
    console.log("this.cartProduct",this.cartProduct);

    if(this.Activeuser){
      if (this.Activeuser.role == "admin"
    || this.Activeuser.role == "admin"
    || this.Activeuser.role == "admin"){
      console.log('You Can,t Add Product');
    }else{
if(this.product.colors.length !== 0 || this.product.sizes.length !== 0){
 if(this.product.colors.length !== 0 && this.cartProduct.colors.length === 0){
   this.alert = !this.alert;
 }
 else if(this.product.sizes.length !== 0 && this.cartProduct.sizes.length === 0){
  this.alert = !this.alert;
}else{
  this.basketService.addItemToBasket(this.cartProduct);
 }
}else{
  this.basketService.addItemToBasket(this.cartProduct);
}
}
}else{
if(this.product.colors.length !== 0 || this.product.sizes.length !== 0){
  if(this.product.colors.length !== 0 && this.cartProduct.colors.length === 0){
    this.alert = !this.alert;
  }
  else if(this.product.sizes.length !== 0 && this.cartProduct.sizes.length === 0){
   this.alert = !this.alert;
 }else{
   this.basketService.addItemToBasket(this.cartProduct);
  }
 }else{
   this.basketService.addItemToBasket(this.cartProduct);
 }
    }

}



}
