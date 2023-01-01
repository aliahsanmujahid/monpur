import { Mixvari } from './../../_models/order';
import { cartProduct } from './../../_models/basket';
import { ReviewService } from './../../_services/review.service';
import { User } from 'src/app/_models/user';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/_models/product';
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
    product: IProduct = null;
    rpage = 0;

  cartProduct: cartProduct = {
    id: 0,
    cateid:0,
    subcateid:0,
    name:'',

    price:0,
    discount:0,
    quantity:0,
    sku:'',
    personalization:'',

    file1:'',
    sellerid:0,

    vari: {
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
  reviews = [];
  images = []


  selectedmixed = '';
  selectedmixed2 = 0;
  selectVari1 = 0;
  Mixvalues1:any = [];
  Mixvalues2:any = [];



  // ngOnChanges() {
  //   window.scrollTo(0, 0);
  //   this.selectedmixed = '';
  //   this.selectedmixed2 = 0;
  //   this.selectVari1 = 0;
  // }

  ngOnInit(): void {
    window.scrollTo(0, 0);

    this.accountService.currentUser$.subscribe( res =>{
      this.activeuser = res;
    });

    this.route.data.subscribe(data => {
      this.product = data['product'];

      console.log(this.product)

      this.filldata();
      this.getreviews();

      //getting variations
      if(this.product.hasmixedvari == "true" && this.product.mixedvari == undefined){
          this.productService.getmixedvari(this.product.id).subscribe( res => {
          this.product = {...this.product,"mixedvari":res}
          this.setmaxvari();
         });
      }
      if(this.product.mixedvari?.values.length > 0){
        this.setmaxvari();
      }

      //getting vari1 values
      if(this.product.hasvari == "true" && this.product.vari == undefined){
        this.productService.getvari(this.product.id).subscribe( res => {
          this.product = {...this.product,"vari":res};
          console.log("getting vari1 values",res);
          console.log("this.product ",this.product);
         });
      }

    });

  }
  //end of ngonit


  setmaxvari(){
    if(this.product.mixedvari.values.length > 0){
      this.product.mixedvari.values.forEach(e1 => {
        if(!this.Mixvalues1.find(x => x.vari1name ==  e1.vari1name)){
          this.Mixvalues1.push(e1);
        }
      });
      }
  }
  
  filldata(){

    this.selectedmixed = '';
    this.selectedmixed2 = 0;
    this.selectVari1 = 0;

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



    this.cartProduct = {
      id: this.product.id,
      cateid:this.product.cateid,
      subcateid:this.product.subcateid,
      name:this.product.name,
      price:this.product.price,
      discount:this.product.discount,
      quantity:this.product.quantity,
      sku:this.product.sku,
      file1:this.product.file1,
      sellerid:this.product.sellerid,

      personalization:'',
      vari : {
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
  }


  getreviews(){
  this.rpage = 0;
  this.reviews = [];

  this.reviewService.getallreviews(this.product.id,++this.rpage).subscribe( res =>{

    this.reviews = res;

  });

  }

  loadreviews(){

    this.reviewService.getallreviews(this.product.id,++this.rpage).subscribe( res =>{

      this.reviews.push(...res);

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



  hidealert(){
    this.alert = !this.alert;
  }

  addItemToBasket(){

    // console.log("this.cartProduct",this.activeuser);
    console.log("this.cartProduct",this.cartProduct);

      var error = 0;

      if (this.activeuser?.role == "ewew"
      || this.activeuser?.role == "wew"){

        console.log('You Can,t Add Product');

      }else{

         if(this.product.hasmixedvari == 'true' && this.cartProduct.mixedvari.values.length == 0){

            this.alert = true;
            this.mixvarialert = true;
            error = 1;

         }


        if(this.product.isp == 'true' && this.cartProduct.personalization == '' ){
          this.alert = true;
          this.personalizationalert = true;
           error = 1;
        }

        if(this.product.hasvari == 'true' && this.cartProduct.vari.values.length == 0){

          this.alert = true;
          this.mixvarialert = true;
          error = 1;

       }

       if(this.product.hasmixedvari == 'true' && this.cartProduct.mixedvari.values.length == 0){

        this.alert = true;
        this.mixvarialert = true;
        error = 1;

      }


    if(error == 0){

      if(this.cartProduct.vari.values.length == 0 && this.cartProduct.mixedvari.values.length == 0){
        this.cartProduct.price =  Number((this.product.price * ( (100-this.product.discount) / 100 )).toFixed(0));
      }

      this.basketService.addItemToBasket(this.cartProduct);
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


onVari1change(){
  let selected = this.product.vari.values.find( x => x.id == this.selectVari1);

  this.product.price = selected?.price;
  this.cartProduct.price = Number((selected.price * ( (100-this.product.discount) / 100 )).toFixed(0));


  this.cartProduct.vari = {
    id: 0,
    name:'',
    values:[]
  },
  this.alert = false;

  this.cartProduct.vari.id = this.product.vari.id;
  this.cartProduct.vari.name = this.product.vari.name;
  this.cartProduct.vari.values.push(selected);

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

  if(this.product.hasmixedvari == "true"){

    this.product.price = selected.price;

    this.cartProduct.price = Number((selected.price * ( (100-this.product.discount) / 100 )).toFixed(0));

  }

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
