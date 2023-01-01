import { ProductService } from './../../_services/product.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { interval, map, timer } from 'rxjs';
import { AccountService } from 'src/app/_services/account.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CategoryService } from 'src/app/_services/category.service';
import { environment } from 'src/environments/environment';
import { Editor } from 'ngx-editor';
import {  Imixvari, Ivalues,IProduct, Ivari  } from 'src/app/_models/product';

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
  createsucc = false;

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
  skumixedvari = false;
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


    sellerid:0,
    hasmixedvari:'',
    hasvari:'',

    personalization:'',
    isp:'none',

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

    vari : {
      id:0,
      name:'',
      values:[]
    },
    mixedvari:{
      id:0,
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


  vari1 : Ivari =  {
    id:0,
    name:'',
    values:[]
  };
  vari2 : Ivari = {
    id:0,
    name:'',
    values:[]
  };

  mixedvari: Imixvari = {
    id:0,
    vari1:'',
    vari2:'',
    values:[]
  }

  values1 : Ivalues = {
      id:0,
      name:'',
      quantity: 0,
      price: 0,
      sku: '',
  };
  values2 : Ivalues = {
    id:0,
    name:'',
    quantity: 0,
    price: 0,
    sku: '',
};


tvari1 : Ivari = {
  id:0,
  name:'',
  values:[]
};
tempmixedvari: Imixvari = {
  id: 0,
  vari1:'',
  vari2:'',
  values:[]
}
temppersonalize = '';

Math: any;




  constructor(public accountService: AccountService,private http: HttpClient,
    private route: ActivatedRoute,public categoryService: CategoryService,
    public productService: ProductService,private router: Router) {}

    messageSuccess:any;

    ngOnChanges() {
      this.nullValues();
    }

  ngOnInit(): void {

    this.nullValues();
    this.createsucc = false;

    this.UserId = this.accountService.getuserid()
    this.editor = new Editor();
    this.editor2 = new Editor();


    if(this.producteditid !== 0){
      this.productService.getEditProduct(this.producteditid).subscribe(res =>{

        console.log("edit product",res);
        this.product = res;

        if(this.product.personalization != ''){
          this.showpersonalization = true
        }

        if(this.product.vari?.values.length > 0){
           console.log("setting vari1",this.vari1);
           this.vari1 = res.vari;
           this.vari1added = true;


        }

        if(this.product.mixedvari?.values.length > 0){
          console.log("setting mixedvari",this.vari1);

          this.mixedvari = res.mixedvari;
          this.tempmixedvari = res.mixedvari;

          this.vari1.name = this.mixedvari.vari1;
          this.vari2.name = this.mixedvari.vari2;
          this.vari1added = true;
          this.vari2added = true;

          this.mixedvari.values.forEach(e => {

            if(!this.vari1.values.find(x => x.name === e.vari1name)){
              console.log("this.vari1",this.vari1);
              this.vari1.values.push({
                id:e.id,
                name:e.vari1name,
                quantity: e.quantity,
                price: e.price,
                sku: e.sku,
              });
            }

            if(!this.vari2.values.find(x => x.name === e.vari2name)){
              this.vari2.values.push({
                id:e.id,
                name:e.vari2name,
                quantity: e.quantity,
                price: e.price,
                sku: e.sku,
              });
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

  inputchange(){
    this.tempmixedvari = this.mixedvari;
    this.tvari1 = this.vari1;
  }

  discountchange(){
    console.log("discount changing");
    if(this.product.discount > 100){
      this.product.discount = 100;
    }
  }


  addvariation1(){
    this.vari1added = true;
    this.disabledbtn = false;
  }
  addvariation2(){
    this.vari2added = true;
    this.disabledbtn = false;
  }
  renamevari1(){
    this.vari1added = false;
    this.disabledbtn = false;
  }
  deletevariname1(){
    this.disabledbtn = false;
    this.vari1added = false;
    this.vari2added = false;
    this.vari1 = {
      id:0,
      name:'',
      values:[]
    }
    this.vari2 = {
      id:0,
      name:'',
      values:[]
    }
    this.mixedvari = {
      id:0,
      vari1:'',
      vari2:'',
      values:[]
    }
  }

  addvari1(){
     this.disabledbtn = false;
     if(this.values1.name != ''){
      this.vari1.values.push(this.values1)
      this.disabledbtn = false;
      this.values1 = {
         id:0,
         name:'',
         quantity: 0,
         price: 0,
         sku: '',
      }
     }
  }

  deletevari1(index){
    this.vari1.values.splice(index,1)
  }

  addvari2(){
    this.disabledbtn = false;
    if(this.values2.name != ''){
     this.vari2.values.push(this.values2)
     this.values2 = {
        id:0,
        name:'',
        quantity: 0,
        price: 0,
        sku: '',
     }
    }
 }

renamevari2(){
  this.disabledbtn = false;
  this.vari2added = false;
}
deletevariname2(){
  this.disabledbtn = false;
  this.vari2added = false;
  this.vari2 = {
    id:0,
    name:'',
    values:[]
  }
}

 deletevari2(index){
   this.vari2.values.splice(index,1)
 }

  alerttoggle(){
    this.alert = !this.alert;
  }

  saveandcontinue(){

    this.mixedvari = {
      id:0,
      vari1:'',
      vari2:'',
      values:[]
    }

    if(this.vari1.values.length > 0 && this.vari2.values.length > 0){
      this.mixedvari.vari1 = this.vari1.name;
      this.mixedvari.vari2 = this.vari2.name;
      this.vari1.values.forEach(vari1 => {
        this.vari2.values.forEach(vari2 => {

          let findvari = this.tempmixedvari.values.find(x=> x.vari1name == vari1.name && x.vari2name == vari2.name);

           this.mixedvari.values.push({
            id:0,
            vari1name:vari1.name,
            vari2name: vari2.name,
            quantity:findvari?.quantity,
            price:findvari?.price,
            sku:findvari?.sku,
           });
        });
      });
    }

    this.alert = false;

  }

  onFeatureToggle($event) {
    console.log("$event.target.value",$event.target.value);
    if ($event.target.checked){
      if($event.target.value == 'personalization'){
        this.showpersonalization = true;
        this.product.personalization = this.temppersonalize;
      }
      if($event.target.value == 'ispersonalization'){
        this.product.isp = "true";
      }
    }
    else{
      if($event.target.value == 'personalization'){

        this.temppersonalize =  this.product.personalization;
        this.product.personalization = "";
        this.showpersonalization = false;

      }
      if($event.target.value == 'ispersonalization'){
        this.product.isp = "false";
      }
    }
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




  //  createProduct
   createProduct(pform){

    if(pform.invalid){
      this.messageSuccess = true;

  setTimeout(()=>{
      this.messageSuccess = false;
  }, 2000);
    }else{

    if(this.vari1.values.length > 0 && this.mixedvari.values.length == 0){
      this.product.vari = this.vari1;
      this.product.price = this.vari1.values.sort((a, b) => Number(a.price) - Number(b.price))[0].price;
      this.product.quantity  = this.vari1.values.reduce((a, b) => (b.quantity) + a, 0);

      this.product.hasvari = "true";
      this.product.hasmixedvari = "";

      this.product.mixedvari = {
       id:0,
       vari1:'',
       vari2:'',
       values:[]
     }
     }else{
      this.product.hasvari="";
      this.product.vari = {
        id:0,
        name:'',
        values:[]
      }
     }
     if(this.mixedvari.values.length > 0){
       this.product.mixedvari = this.mixedvari;
       this.product.price = this.mixedvari.values.sort((a, b) => Number(a.price) - Number(b.price))[0].price;
       this.product.quantity  = this.mixedvari.values.reduce((a, b) => (b.quantity) + a, 0);

       this.product.hasvari = "";
       this.product.hasmixedvari = "true";

       this.product.vari = {
         id:0,
         name:'',
         values:[]
       }
     }else{
      this.product.hasmixedvari="";
      this.product.mixedvari = {
        id:0,
        vari1:'',
        vari2:'',
        values:[]
      }
     }



     if(this.product.id == 0){
       if(this.product.file1 !== '' && this.product.file2 !== ''){

        console.log("createproduct res",this.product);

           this.productService.createproduct(this.product).subscribe( res =>{

             if(res.success == true){
              this.createsucc = true;
             }
          });
       }else{
        this.messageSuccess = true;

  setTimeout(()=>{
      this.messageSuccess = false;
  }, 2000);
       }
     }else{


         if(this.product.file1 !== '' && this.product.file2 !== ''){

          console.log("updateproduct res",this.product);

          this.productService.updateproduct(this.product).subscribe( res =>{
            console.log("update res",res);
            if(res.success == true){
             this.createsucc = true;
            }
         });
         }else{
          this.messageSuccess = true;

          setTimeout(()=>{
              this.messageSuccess = false;
          }, 2000);
         }

     }

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



  nullValues(){
    this.product = {
      id: 0,
      cateid:0,
      subcateid:0,
      name:'',
      details:'',
      sku:'',

      sellerid:0,
      hasmixedvari:'',
      hasvari:'',

      personalization:'',
      isp:'none',

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


      vari : {
        id:0,
        name:'',
        values:[]
      },
      mixedvari:{
        id:0,
        vari1:'',
        vari2:'',
        values:[]
      }
    };

    this.disabledbtn = false;
    this.vari1added = false;
    this.vari2added = false;
    this.vari1 = {
      id:0,
      name:'',
      values:[]
    }
    this.tvari1 = {
      id:0,
      name:'',
      values:[]
    }
    this.vari2 = {
      id:0,
      name:'',
      values:[]
    }
    this.mixedvari = {
      id:0,
      vari1:'',
      vari2:'',
      values:[]
    }
    this.tempmixedvari = {
      id:0,
      vari1:'',
      vari2:'',
      values:[]
    }

  }

}
