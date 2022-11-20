import { Ivalues, Ivari } from './../../_models/product';

import { ProductService } from './../../_services/product.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { AccountService } from 'src/app/_services/account.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CategoryService } from 'src/app/_services/category.service';
import { environment } from 'src/environments/environment';
import { Editor } from 'ngx-editor';
import { IProduct } from 'src/app/_models/product';

@Component({
  selector: 'app-createproduct',
  templateUrl: './createproduct.component.html',
  styleUrls: ['./createproduct.component.css']
})
export class CreateproductComponent implements OnInit {

  @Input() producteditid = 0;

  editor: Editor;
  editor2: Editor;
  html: '';
  alert = false;

  imglink = environment.imgUrl;

  progress: number = null;
  message: string = null;
  UserId: string;
  active:any;
  active1 = true;
  active2 = true;
  editmode = false;

  vari1added = false;
  vari2added = false;
  disabledbtn = true;
  pricemixedvari = false;
  quantitymixedvari = false;
  saved = false;
  showdiscount = true;
  showpersonalization = false;


  product: IProduct = {
    id: 0,
    cateid:0,
    subcateid:0,
    name:'',
    details:'',
    sku:'',
    personalization:'',

    price:null,
    discount:null,
    quantity:null,

    file1:'',
    file2:'',
    file3:'',
    file4:'',
    file5:'',
    file6:'',
    file7:'',
    file8:'',

    hasvari1:'',
    hasprice1:'',
    hasquantity1:'',

    hasvari2:'',
    hasprice2:'',
    hasquantity2:'',

    hasmixedvari:'',

    vari1 : {
      name:'',
      values:[]
    },
    vari2 : {
      name:'',
      values:[]
    },
    mixedvari:{
      vari1:'',
      vari2:'',
      values:[]
    }
  };

  categoryes: any = [];
  subcategoryes: any = [];

  isColor:Boolean = false;
  isSize:Boolean = false;
  qtyshow = false;

  values1 : Ivalues = {
      name:'',
      quantity: 0,
      price: 0,
  };

  values2 : Ivalues = {
    name:'',
    quantity: 0,
    price: 0,
};
Math: any;




  constructor(public accountService: AccountService,private http: HttpClient,
    private route: ActivatedRoute,public categoryService: CategoryService,
    public productService: ProductService) { }

  ngOnInit(): void {
    this.UserId = this.accountService.getuserid()
    this.editor = new Editor();
    this.editor2 = new Editor();

    if(this.producteditid !== 0){
      this.productService.getEditProduct(this.producteditid).subscribe(res =>{
        this.product = res;

        if(this.product.mixedvari.values.length > 0){
          this.vari1added = true;
          this.vari2added = true;
          this.pricemixedvari = true;
          this.quantitymixedvari = true;
          this.saved = true;
          this.editmode = true;

        this.product.mixedvari.vari1 = this.product.mixedvari.vari1;
        this.product.mixedvari.vari2 = this.product.mixedvari.vari2;

        this.product.mixedvari.values.forEach(e1 => {

          if(!this.product.vari1.values.find(x => x.name ==  e1.vari1name)){
            this.product.vari1.values.push(
              {
                name:e1.vari1name,
                price: e1.price,
                quantity: e1.quantity
              }
            );
          }
          if(!this.product.vari2.values.find(x => x.name ==  e1.vari2name)){
            this.product.vari2.values.push(
              {
                name:e1.vari2name,
                price: e1.price,
                quantity: e1.quantity
              }
            );
          }


        });

        }

        console.log("edited product ",this.product);
      });
    }
    this.getcate();
    this.getsubcate();
  }


  ngOnDestroy(): void {
    this.editor.destroy();
    this.editor2.destroy();
  }

  showproductdata(){
    console.log("Product Data",this.product);
  }

  calculateDiscount(){
     this.showdiscount = true;
  }


  saveandcontinue(){
    this.editmode = true;
    this.alert = !this.alert;
    if( this.product.hasprice1 == 'true' &&  this.product.hasprice2 == 'true'){
      this.pricemixedvari = true;
      this.product.mixedvari = {
        vari1:'',
        vari2:'',
        values:[]
      }

      this.product.hasmixedvari = "true";
      this.product.mixedvari.vari1 = this.product.vari1.name;
      this.product.mixedvari.vari2 = this.product.vari2.name;
      this.product.vari1.values.forEach(vari1 => {
        this.product.vari2.values.forEach(vari2 => {
           this.product.mixedvari.values.push({
            vari1name:vari1.name,
            vari2name: vari2.name,
            quantity:0,
            price:0
           });

        });
      });
      this.saved = true;

    }
    if( this.product.hasquantity1 == 'true' &&  this.product.hasquantity2 == 'true'){
      this.quantitymixedvari = true;
      this.product.mixedvari = {
        vari1:'',
        vari2:'',
        values:[]
      }

      this.product.hasmixedvari = "true";
      this.product.mixedvari.vari1 = this.product.vari1.name;
      this.product.mixedvari.vari2 = this.product.vari2.name;
      this.product.vari1.values.forEach(vari1 => {
        this.product.vari2.values.forEach(vari2 => {
           this.product.mixedvari.values.push({
            vari1name:vari1.name,
            vari2name: vari2.name,
            quantity:0,
            price:0
           });

        });
      });
      this.saved = true;
    }

    if( this.product.hasprice1 == '' ||  this.product.hasprice2 == ''){
      this.pricemixedvari = false;
    }
    if( this.product.hasquantity1 == '' ||  this.product.hasquantity2 == ''){
      this.quantitymixedvari = false;
    }

  }

  onFeatureToggle($event) {
    if ($event.target.checked){
      if($event.target.value == 'hasprice1'){
          this.product.hasprice1 = 'true'
      }
      if($event.target.value == 'hasprice2'){
        this.product.hasprice2 = 'true'
      }
      if($event.target.value == 'hasquantity1'){
        this.product.hasquantity1 = 'true'
      }
      if($event.target.value == 'hasquantity2'){
        this.product.hasquantity2 = 'true'
      }
      if($event.target.value == 'personalization'){
        this.showpersonalization = true;
      }
    }
    else {
      if($event.target.value == 'hasprice1'){
        this.product.hasprice1 = ''
      }
      if($event.target.value == 'hasprice2'){
        this.product.hasprice2 = ''
      }
      if($event.target.value == 'hasquantity1'){
       this.product.hasquantity1 = ''
      }
      if($event.target.value == 'hasquantity2'){
       this.product.hasquantity2 = ''
      }
    }
  }


  addvariation1(){
    this.vari1added = true;
  }
  addvariation2(){
    this.vari2added = true;
  }
  renamevari1(){
    this.vari1added = false;
  }
  deletevariname1(){
    this.vari1added = false;
    this.product.vari1 = {
      name:'',
      values:[]
    }
  }

  renamevari2(){
    this.vari2added = false;
  }
  deletevariname2(){
    this.vari2added = false;
    this.product.vari2 = {
      name:'',
      values:[]
    }
  }

  addvari1(){
     if(this.values1.name != ''){
      this.product.vari1.values.push(this.values1)
      this.disabledbtn = false;
      this.values1 = {
         name:'',
         quantity: 0,
         price: 0,
      }
     }
  }

  deletevari1(index){
    if(this.product.vari1.values.length == 1){
      this.disabledbtn = true;
    }
    this.product.vari1.values.splice(index,1)
  }

  addvari2(){
    if(this.values2.name != ''){
     this.product.vari2.values.push(this.values2)
     this.values2 = {
        name:'',
        quantity: 0,
        price: 0,
     }
    }
 }

 deletevari2(index){
   this.product.vari2.values.splice(index,1)
 }


 cancelvaripopup(){
  if(this.vari1added && this.product.vari1.values.length == 0){
     this.disabledbtn = true;
  }
  // if(this.vari2added && this.product.vari2.values.length == 0){
  //   this.disabledbtn = true;
  // }

  if(this.editmode == false){
    this.product.hasprice1 = ''
    this.product.hasprice2 = ''
    this.product.hasquantity1 = ''
    this.product.hasquantity2 = ''
    this.product.vari1 = {
      name:'',
      values:[]
    },
    this.product.vari2 = {
      name:'',
      values:[]
    }
    this.values2 = {
      name:'',
      quantity: 0,
      price: 0,
   }
   this.vari1added = false;
   this.vari2added = false;
  }
  this.alert = !this.alert;

 }

  alerttoggle(){
    this.alert = !this.alert;
  }

  getcate(){
    this.categoryService.getallcate().subscribe( res => {
      this.categoryes = res;
    }),
    error => {
    };
  }
  getsubcate(){
    this.categoryService.getallsubcate().subscribe( res => {
      this.subcategoryes = res;
    }),
    error => {
    };
  }

  public uploadFile = (files,val) => {

    this.progress = null;
    this.message = null;

    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload);
    formData.append('userId',this.UserId);


    this.http.post(this.imglink+'api/user/imageupload', formData, {reportProgress: true, observe: 'events'})
    .pipe(
      map((data: any) => {
        if (data.type === HttpEventType.UploadProgress)
        this.progress = Math.round(100 * data.loaded / data.total);
        else if (data.type === HttpEventType.Response) {
        this.message = 'Upload success.';


        if(val == 1){
           this.product.file1 = data.body.imagePath
        }
        if(val == 2){
          this.product.file2 = data.body.imagePath
       }
       if(val == 3){
        this.product.file3 = data.body.imagePath
     }
     if(val == 4){
      this.product.file4 = data.body.imagePath
   }
   if(val == 5){
    this.product.file5 = data.body.imagePath
 }
 if(val == 6){
  this.product.file6 = data.body.imagePath
}
if(val == 7){
  this.product.file7 = data.body.imagePath
}
if(val == 8){
  this.product.file8 = data.body.imagePath
}
  }})
    ).subscribe();
  }




   deleteimage = async(path,val) =>{
    this.message = "Deleteing";
    this.progress = null;
    this.http.post(this.imglink+'api/user/deleteimage', {imagePath:path})
    .pipe(
      map((data: any) => {

        this.message = "Deleted";
        if(val == 1){
          this.product.file1 = ''
        }
        if(val == 2){
          this.product.file2 = ''
        }
        if(val == 3){
          this.product.file3 = ''
        }
        if(val == 4){
          this.product.file4 = ''
        }
        if(val == 5){
          this.product.file5 = ''
        }
        if(val == 6){
          this.product.file6 = ''
        }
        if(val == 7){
          this.product.file7 = ''
        }
        if(val == 8){
          this.product.file8 = ''
        }
      })
    ).subscribe();
   }

   createProduct(){

    console.log("this.product",this.product);

    if(this.product.id == 0){
      if(this.product.file1 !== ''){

          this.productService.createproduct(this.product).subscribe( res =>{
            console.log("res",res);
         }),
         error => {

         };

      }else{
      }
    }else{

        this.productService.updateproduct(this.product).subscribe( res =>{
            console.log("res",res);
       }),
       error => {

       };

    }

   }




   onCateChange(){
    if(this.product.cateid !== 0){
      this.categoryService.getsubcatebyid(this.product.cateid).subscribe( res => {
        this.subcategoryes = res;
        this.product.subcateid = 0;
      }),
      error => {
      };
    }
  }





}
