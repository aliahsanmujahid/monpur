import { ISizes } from './../../_models/product';
import { ProductService } from './../../_services/product.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { IColors, IProduct } from 'src/app/_models/product';
import { AccountService } from 'src/app/_services/account.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { CategoryService } from 'src/app/_services/category.service';

@Component({
  selector: 'app-createproduct',
  templateUrl: './createproduct.component.html',
  styleUrls: ['./createproduct.component.css']
})
export class CreateproductComponent implements OnInit {

  progress: number = null;
  message: string = null;
  UserId: string;
  active:any;
  active1 = true;
  active2 = true;
  hasvari = false;

  product: IProduct = {
    id: 0,
    cateid:0,
    subcateid:0,
    name:'',
    details:'',
    orgprice:null,
    discprice:null,
    qty:null,
    file1:'',
    file2:'',
    file3:'',
    file4:'',
    file5:'',
    file6:'',
    file7:'',
    file8:'',
    colors : [],
    sizes : []
  };

  categoryes: any = [];
  subcategoryes: any = [];

  isColor:Boolean = false;
  isSize:Boolean = false;
  qtyshow = false;


  colors: IColors ={
    colorCode:"#1c03ed",
    name:"",
    quantity:null,
  };
  sizes: ISizes ={
    name:null,
    variCode:'',
    quantity:null,
  };




  constructor(public accountService: AccountService,private http: HttpClient,
    private route: ActivatedRoute,public categoryService: CategoryService,
    public productService: ProductService) { }

  ngOnInit(): void {
    this.UserId = this.accountService.getuserid()

    this.route.params.subscribe(p => {
      if(p['id'] != 0 && p['id'] != null){
        this.productService.getEditProduct(p['id']).subscribe(res =>{
          this.product = res;
          if(this.product.sizes.length > 0){
            this.hasvari = true;
            this.sizes.name = this.product.sizes[0].name;
          }
        });
      }

    });
    this.getcate();
    this.getsubcate();
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


    this.http.post('http://localhost:8000/api/user/imageupload', formData, {reportProgress: true, observe: 'events'})
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
    this.http.post('http://localhost:8000/api/user/deleteimage', {imagePath:path})
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

   createProduct(ProductForm: NgForm){
    if(this.product.id == 0){
      if(this.product.file1 !== ''){
        if(ProductForm.valid){
          this.productService.createproduct(this.product).subscribe( res =>{
            console.log("res",res);
         }),
         error => {

         };
       }
      }else{
      }
    }else{
      if(ProductForm.valid){
        this.productService.updateproduct(this.product).subscribe( res =>{
            console.log("res",res);
       }),
       error => {

       };
     }
    }

   }



   quantityShow(): any{
    if(this.product.colors.length !== 0 || this.product.sizes.length !== 0){
       return false;
    }if(this.product.colors.length === 0 || this.product.sizes.length === 0){
      return true;
   }
  }

   setQuantity(){
    if(this.product.colors.length === 0 || this.product.sizes.length === 0){
       this.product.qty = null;
    }
    if(this.product.colors.length !== 0){
       this.product.qty = this.product.colors.reduce((a, b) => (b.quantity) + a, 0);
       return;
    }
    if(this.product.sizes.length !== 0){
      this.product.qty = this.product.sizes.reduce((a, b) => (b.quantity) + a, 0)
   }

  }

   setColor(){
    this.product.colors.push(this.colors);
    this.colors = {
      colorCode:"#1c03ed",
      name:"",
      quantity: null
    };
    this.setQuantity();
  }
  setSize(){
    this.product.sizes.push(this.sizes);
    this.sizes = {
      name:this.sizes.name,
      variCode:'',
      quantity: null
    };
    this.setQuantity();
  }

   addColors(id){
    if(id == 1){
      this.active1 = !this.active1;
      if(this.active2 == false){
        this.active2 = true;
      }
    }
    if(id == 2){
      this.active2 = !this.active2;
      if(this.active1 == false){
        this.active1 = true;
      }
    }
    this.active = id;
    if(this.product.sizes.length === 0){
      this.isColor = !this.isColor;
    }
    if(this.isSize === true){
      this.isSize = false;
    }
    if(this.product.sizes.length == 0){
      this.sizes.name = null;
      this.hasvari = false;

    }

  }
  addSizes(id){
    if(id == 1){
      this.active1 = !this.active1;
      if(this.active2 == false){
        this.active2 = true;
      }
    }
    if(id == 2){
      this.active2 = !this.active2;
      if(this.active1  == false){
        this.active1 = true;
      }
    }
    this.active = id;
    if(this.product.colors.length === 0){
      this.isSize = !this.isSize;
    }
    if(this.isColor === true){
      this.isColor = false;
    }
  }

  removeColor(name: String){
    var color =this.product.colors.find.name == name;
    let index = this.product.colors.findIndex(d => d.name === name); //find index in your array
    this.product.colors.splice(index, 1);
    this.setQuantity();
 }
 removeSize(name: String){
   var color =this.product.sizes.find.name == name;
   let index = this.product.sizes.findIndex(d => d.name === name); //find index in your array
   this.product.sizes.splice(index, 1);
   this.setQuantity();
 }

 setVariname(){

  if(this.product.sizes.length !== 0){
    for (let i = 0; i < this.product.sizes.length; i++) {
      this.product.sizes[i].name = this.sizes.name;
    }
  }

  this.hasvari = true;
 }

 changevari(){
  this.hasvari = false;
 }

   onCateChange(){
    if(this.product.cateid !== 0 && this.product.cateid !== -1){
      this.categoryService.getsubcatebyid(this.product.cateid).subscribe( res => {
        this.subcategoryes = res;
        this.product.subcateid = 0;
      }),
      error => {
      };
    }
  }
  

}
