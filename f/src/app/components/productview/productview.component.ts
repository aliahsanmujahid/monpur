import { ReviewService } from './../../_services/review.service';
import { User } from 'src/app/_models/user';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/_models/product';
import { BasketService } from 'src/app/_services/basket.service';
import { ProductService } from 'src/app/_services/product.service';
import { environment } from 'src/environments/environment';
import { Editor } from 'ngx-editor';

@Component({
  selector: 'app-productview',
  templateUrl: './productview.component.html',
  styleUrls: ['./productview.component.css']
})
export class ProductviewComponent implements OnInit {

  constructor(private route: ActivatedRoute,private productService: ProductService,
    private basketService: BasketService,private reviewService: ReviewService) { }

    imglink = environment.imgUrl;
  product: Product;
  cartProduct: Product = {
    id: 0,
    cateid:0,
    subcateid:0,
    name:'',
    details:'',

    price:0,
    tempprice:0,
    discount:0,
    quantity:0,
    sku:'',
    personalization:'',

    file1:'',
    file2:'',
    file3:'',
    file4:'',
    file5:'',
    file6:'',
    file7:'',
    file8:'',
    sellerid:0,
    hasvari1:'',
    hasprice1:'',
    hasquantity1:'',

    hasvari2:'',
    hasprice2:'',
    hasquantity2:'',

    hasmixedvari:'',
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
  malert = false;
  review = false;
  Activeuser: User;
  reviews: any = [];
  images = []

  selectedmixed = '';
  selectedmixed2 = 0;
  Mixvalues1:any = [];
  Mixvalues2:any = [];



  ngOnInit(): void {

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
    details:this.product.details,

    price:this.product.price,
    tempprice:this.product.tempprice,
    discount:this.product.discount,
    quantity:this.product.quantity,
    personalization:'',
    sku:'',
    file1:this.product.file1,
    file2:'',
    file3:'',
    file4:'',
    file5:'',
    file6:'',
    file7:'',
    file8:'',
    sellerid:this.product.sellerid,

    hasvari1:'',
    hasprice1:'',
    hasquantity1:'',

    hasvari2:'',
    hasprice2:'',
    hasquantity2:'',

    hasmixedvari:'',

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

  this.getreviews();

  }

  getreviews(){
  this.reviewService.getallreviews(this.product.id).subscribe( res =>{
    this.reviews = res;
  });
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

  sendmessage(){


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

//   addItemToBasket(){
//     console.log("this.cartProduct",this.cartProduct);

//     if(this.Activeuser){
//       if (this.Activeuser.role == "admin"
//     || this.Activeuser.role == "admin"
//     || this.Activeuser.role == "admin"){
//       console.log('You Can,t Add Product');
//     }else{
// if(this.product.colors.length !== 0 || this.product.sizes.length !== 0){
//  if(this.product.colors.length !== 0 && this.cartProduct.colors.length === 0){
//    this.alert = !this.alert;
//  }
//  else if(this.product.sizes.length !== 0 && this.cartProduct.sizes.length === 0){
//   this.alert = !this.alert;
// }else{
//   this.basketService.addItemToBasket(this.cartProduct);
//  }
// }else{
//   this.basketService.addItemToBasket(this.cartProduct);
// }
// }
// }else{
// if(this.product.colors.length !== 0 || this.product.sizes.length !== 0){
//   if(this.product.colors.length !== 0 && this.cartProduct.colors.length === 0){
//     this.alert = !this.alert;
//   }
//   else if(this.product.sizes.length !== 0 && this.cartProduct.sizes.length === 0){
//    this.alert = !this.alert;
//  }else{
//    this.basketService.addItemToBasket(this.cartProduct);
//   }
//  }else{
//    this.basketService.addItemToBasket(this.cartProduct);
//  }
//     }

// }



onMixedChange(){
  if(this.selectedmixed !== ''){
   this.selectedmixed2 = 0;
   this.Mixvalues2 =  this.product.mixedvari.values.filter(p => p.vari1name.includes(this.selectedmixed));
  }
}

onMixedChange2(){
  this.product.price = this.product.mixedvari.values.find( x => x.id == this.selectedmixed2).price;
}



}
