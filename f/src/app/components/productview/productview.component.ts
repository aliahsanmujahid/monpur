import { cartProduct } from './../../_models/basket';
import { ReviewService } from './../../_services/review.service';
import { User } from 'src/app/_models/user';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/_models/product';
import { BasketService } from 'src/app/_services/basket.service';
import { ProductService } from 'src/app/_services/product.service';
import { environment } from 'src/environments/environment';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-productview',
  templateUrl: './productview.component.html',
  styleUrls: ['./productview.component.css']
})
export class ProductviewComponent implements OnInit {

  constructor(private route: ActivatedRoute,private productService: ProductService,
    private basketService: BasketService,private reviewService: ReviewService,
    public accountService: AccountService) { }

    imglink = environment.imgUrl;
    selectedimg = '';
    product: Product;

  cartProduct: cartProduct = {
    id: 0,
    cateid:0,
    subcateid:0,
    name:'',

    price:0,
    tempprice:0,
    discount:0,
    quantity:0,
    sku:'',
    personalization:'',

    file1:'',
    sellerid:0,

    vari1 : {
      id: 0,
      name:'',
      values:[]
    },
    vari2 : {
      id: 0,
      name:'',
      values:[]
    },
    mixedvari:{
      id: 0,
      vari1:'',
      vari2:'',
      values:[]
    }
  };

  alert = false;
  vari1alert = false;
  vari2alert = false;
  mixvarialert = false;
  personalizationalert = false;

  malert = false;
  review = false;
  activeuser: User;
  reviews: any = [];
  images = []

  selectedmixed = '';
  selectedmixed2 = 0;
  Mixvalues1:any = [];
  Mixvalues2:any = [];



  ngOnInit(): void {

    this.accountService.currentUser$.subscribe( res =>{
      this.activeuser = res;
    });


    this.route.data.subscribe(data => {

      console.log("route data",data);
      this.product = data['product'];

      if(this.product.mixedvari.values.length > 0){

        this.product.mixedvari.values.forEach(e1 => {

          if(!this.Mixvalues1.find(x => x.vari1name ==  e1.vari1name)){
            this.Mixvalues1.push(e1);
          }

        });

      }


      if(this.product.file1 != ""){
        this.images.push({
          imageSrc:
          this.imglink+this.product.file1,
          imageAlt: 'nature1',
        });
      }
      if(this.product.file2 != ""){
        this.images.push({
          imageSrc:
          this.imglink+this.product.file2,
          imageAlt: 'nature1',
        });
      }
      if(this.product.file3 != ""){
        this.images.push({
          imageSrc:
              this.imglink+this.product.file3,
          imageAlt: 'nature1',
        });
      }
      if(this.product.file4 != ""){
        this.images.push({
          imageSrc:
          this.imglink+this.product.file4,
          imageAlt: 'nature1',
        });
      }
      if(this.product.file5 != ""){
        this.images.push({
          imageSrc:
          this.imglink+this.product.file5,
          imageAlt: 'nature1',
        });
      }
      if(this.product.file6 != ""){
        this.images.push({
          imageSrc:
              this.product.file6,
          imageAlt: 'nature1',
        });
      }
      if(this.product.file7 != ""){
        this.images.push({
          imageSrc:
              this.product.file7,
          imageAlt: 'nature1',
        });
      }
      if(this.product.file8 != ""){
        this.images.push({
          imageSrc:
              this.product.file8,
          imageAlt: 'nature1',
        });
      }

      console.log("this.product",this.product);

      // if(!this.product.colors || !this.product.sizes ){

      //     if(this.product.hascolor == "true"){
      //       console.log("setting color");
      //       this.productService.getcolors(this.product.id).subscribe( res => {
      //        this.product = {...this.product,"colors":res,"sizes":[]}
      //       // console.log(this.product);
      //       });
      //     }
      //     if(this.product.hassize == "true"){
      //       this.productService.getsizes(this.product.id).subscribe( res => {
      //         this.product = {...this.product,"sizes":res,"colors":[]}
      //        // console.log(this.product);
      //       });
      //     }
      // }
      window.scrollTo(0, 0);
    })

    this.cartProduct = {
    id: this.product.id,
    cateid:this.product.cateid,
    subcateid:this.product.subcateid,
    name:this.product.name,
    price:this.product.price,
    tempprice:this.product.tempprice,
    discount:this.product.discount,
    quantity:this.product.quantity,
    sku:this.product.sku,
    file1:this.product.file1,
    sellerid:this.product.sellerid,

    personalization:'',
    vari1 : {
      id: null,
      name:'',
      values:[]
    },
    vari2 : {
      id: null,
      name:'',
      values:[]
    },
    mixedvari:{
      id: null,
      vari1:'',
      vari2:'',
      values:[]
    }

    };

  this.getreviews();

  }


  getreviews(){
  this.reviewService.getallreviews(this.product.id).subscribe( res =>{
    this.reviews = res;
  });
  }

  selectimg(img){
    this.selectedimg = img;
  }
  alerttoggle(){
    this.malert = !this.malert;
    this.images = [];


    if(this.product.file1 != ""){
      this.images.push({
        imageSrc:
            this.product.file1,
        imageAlt: 'nature1',
      });
    }
    if(this.product.file2 != ""){
      this.images.push({
        imageSrc:
            this.product.file2,
        imageAlt: 'nature1',
      });
    }
    if(this.product.file3 != ""){
      this.images.push({
        imageSrc:
            this.product.file3,
        imageAlt: 'nature1',
      });
    }
    if(this.product.file4 != ""){
      this.images.push({
        imageSrc:
            this.product.file4,
        imageAlt: 'nature1',
      });
    }
    if(this.product.file5 != ""){
      this.images.push({
        imageSrc:
            this.product.file5,
        imageAlt: 'nature1',
      });
    }
    if(this.product.file6 != ""){
      this.images.push({
        imageSrc:
            this.product.file6,
        imageAlt: 'nature1',
      });
    }
    if(this.product.file7 != ""){
      this.images.push({
        imageSrc:
            this.product.file7,
        imageAlt: 'nature1',
      });
    }
    if(this.product.file8 != ""){
      this.images.push({
        imageSrc:
            this.product.file8,
        imageAlt: 'nature1',
      });
    }

  }
  reviewtoggle(id = -1){
    this.review = !this.review;
    this.images = [];

    if(id != -1){
      const review = this.reviews.find(element => element = id);
      if(review){
         if(review.image1 != ""){
          this.images.push({
            imageSrc:
                review.image1,
            imageAlt: 'nature1',
          });
        }
        if(review.image2 != ""){
          this.images.push({
            imageSrc:
               review.image2,
            imageAlt: 'nature1',
          });
        }
        if(review.image3 != ""){
          this.images.push({
            imageSrc:
               review.image3,
            imageAlt: 'nature1',
          });
        }
        if(review.image4 != ""){
          this.images.push({
            imageSrc:
               review.image4,
            imageAlt: 'nature1',
          });
        }
      }
    }
    console.log(id);
  }



  // setColor(color, $event){
  //   if ($event.target.checked){
  //     this.cartProduct.colors = [];

  //     this.cartProduct.colors.push(color);
  //     this.alert = false;

  //   }
  //   else {
  //     const index = this.cartProduct.colors.indexOf(color);
  //     this.cartProduct.colors.splice(index, 1);

  //   }

  // }
  // setSize(size, $event){
  //   if ($event.target.checked){
  //     this.cartProduct.sizes = [];
  //     this.cartProduct.sizes.push(size);
  //     this.alert = false;
  //   }
  //   else {
  //     const index = this.cartProduct.sizes.indexOf(size);
  //     this.cartProduct.sizes.splice(index, 1);

  //   }

  // }

  hidealert(){
    this.alert = !this.alert;
  }

  addItemToBasket(){

    console.log("this.cartProduct",this.activeuser);
    console.log("this.cartProduct",this.cartProduct);

      if (this.activeuser?.role == "ewew"
      || this.activeuser?.role == "wew"){

        console.log('You Can,t Add Product');

      }else{

         if(this.product.hasmixedvari == 'true' && this.cartProduct.mixedvari.values.length == 0){

            console.log("mixvari ",this.cartProduct);
            this.alert = true;
            this.mixvarialert = true;
         }else{

          if(this.product.ispersonalization !== 'true'){
            this.basketService.addItemToBasket(this.cartProduct);
          }

         }

         if(this.product.ispersonalization == 'true' && this.cartProduct.personalization == '' ){
          this.alert = true;
          this.personalizationalert = true;
         }else{
          if(this.cartProduct.mixedvari.values.length !== 0){
            this.basketService.addItemToBasket(this.cartProduct);
          }
         }


      }


}



onMixedChange(){

  this.cartProduct.mixedvari = {
    id: null,
    vari1:'',
    vari2:'',
    values:[]
  }
  this.alert = false;

  if(this.selectedmixed !== ''){
   this.selectedmixed2 = 0;
   this.Mixvalues2 =  this.product.mixedvari.values.filter(p => p.vari1name.includes(this.selectedmixed));
  }
}

onMixedChange2(){

  this.cartProduct.mixedvari = {
    id: null,
    vari1:'',
    vari2:'',
    values:[]
  }
  this.alert = false;
  this.mixvarialert = false;

  let selected = this.product.mixedvari.values.find( x => x.id == this.selectedmixed2);
  this.product.price = selected.price;

  this.cartProduct.mixedvari.id = this.product.mixedvari.id;
  this.cartProduct.mixedvari.vari1 = this.product.mixedvari.vari1;
  this.cartProduct.mixedvari.vari2 = this.product.mixedvari.vari2;

  this.cartProduct.mixedvari.values.push(selected);


}

inputchange(){
  this.alert = false;
  this.personalizationalert = false;
  console.log("inputchange");
}



}
