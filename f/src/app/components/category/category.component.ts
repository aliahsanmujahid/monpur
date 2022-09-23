import { CategoryService } from './../../_services/category.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  constructor(private http: HttpClient,public accountService: AccountService,public categoryService: CategoryService) { }

  category = {
    id:0,
    name:'',
    image:''
  };

  subcategory = {
    cateid:0,
    name:'',
    image:''
  };

  categoryes: any = [];
  subcategoryes: any = [];

  progress: number = null;
  message: string = null;
  UserId: string;

  cate:boolean=true;
  subcate:boolean=false;
  iscate:boolean=true;
  issubcate:boolean=true;

  ngOnInit(): void {
    this.UserId = this.accountService.getuserid()

    this.categoryService.getallcate().subscribe( res => {
      this.categoryes = res;
    });
  }

  addcate(){
    this.cate = true;
    this.subcate = false;
    this.iscate = true;
    this.issubcate = true;
  }
  addsubcate(id){
    this.subcategoryes = [];
    if(id !== 0){
      this.categoryService.getsubcatebyid(id).subscribe( res => {
        this.subcategoryes = res;
      });
    }else{
    this.categoryService.getallsubcate().subscribe( res => {
      this.subcategoryes = res;
    });
    }


    this.cate = false;
    this.subcate = true;
    this.iscate = true;
    this.issubcate = true;
  }
  createcate(){
    this.iscate = !this.iscate;
  }
  createsubcate(){
    this.issubcate = !this.issubcate;
  }

  catecreate(){
    this.categoryService.createcate(this.category).subscribe( res =>{
      this.categoryes.push(res);
      console.log(this.categoryes);
      this.iscate = !this.iscate;
    });

  }
  subcatecreate(){
   this.categoryService.createsubcate(this.subcategory).subscribe( res =>{
    this.subcategoryes.push(res);
    console.log(this.subcategoryes);
    this.issubcate = !this.issubcate;
  });
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
          this.category.image = data.body.imagePath
        }
        if(val == 2){
          this.subcategory.image = data.body.imagePath
        }


      }})).subscribe();
  }


  deleteimage = async(path,val) =>{
    this.message = "Deleteing";
    this.progress = null;
    this.http.post('http://localhost:8000/api/user/deleteimage', {imagePath:path})
    .pipe(
      map((data: any) => {
        this.message = "Deleted";
          if(val == 1){
            this.category.image = ''
          }
          if(val == 2){
            this.subcategory.image = ''
          }
      })
    ).subscribe();
   }



   editcate(c){
    this.category = c;
    console.log(c);
    this.iscate = false;
   }
   editsubcate(c){
    this.subcategory = c;
    console.log(c);
    this.issubcate = false;
   }





}
