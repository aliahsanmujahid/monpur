import { ProductService } from './../../_services/product.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { IProduct } from 'src/app/_models/product';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-createproduct',
  templateUrl: './createproduct.component.html',
  styleUrls: ['./createproduct.component.css']
})
export class CreateproductComponent implements OnInit {

  public progress: number = null;
  public message: string = null;
  UserId: string;

  product: IProduct = {
    name:'',
    details:'',
    orgprice:'',
    discprice:'',
    file1:'',
    file2:'',
    file3:'',
    file4:'',
    file5:'',
    file6:'',
    file7:'',
    file8:''
  };



  constructor(public accountService: AccountService,private http: HttpClient,
    public productService: ProductService) { }

  ngOnInit(): void {
    this.UserId = this.accountService.getuserid()
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
    formData.append('userid',this.UserId);


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
    this.http.post('http://localhost:8000/api/user/deleteimage', {imagePath:path})
    .pipe(
      map((data: any) => {
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

    this.progress = null;
    this.message = "Deleted";
   }

   createProduct(){
    this.productService.createproduct(this.product).subscribe(res =>{
      console.log("res",res);
    });
   }

}
