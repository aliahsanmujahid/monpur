import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  editmode:boolean = false;
  noaddress:boolean = false;

  useraddress:any = [];
  user:any = {};


  model = {
    id:0,
    uid:'',
    name:'',
    phone:'',
    email:'',
    address:'',
    city:'',
    state:'',
    zip:''
  };

  constructor(public accountService: AccountService,public router: Router) { }

  ngOnInit(): void {

      this.accountService.currentUser$.subscribe( user => {
        if(user){
          this.user = user;
          this.model.uid = this.user.userId;
          console.log(user)
          this.getaddress();
        }
      });


  }

  createAddress(){
    this.accountService.createaddress(this.model).subscribe(res=>{
        this.useraddress = res;
        if(this.useraddress.length > 0){
          console.log("create res",res);
          this.model = this.useraddress[0];
          this.noaddress = false;
          this.editmode = false;
         }
    });
  }

  updateAddress(){
    this.accountService.updateaddress(this.model).subscribe(res=>{
      this.useraddress = res;
      if(this.useraddress.length > 0){
        this.model = this.useraddress[0];
        this.noaddress = false;
        this.editmode = false;
       }
  });
  }

  getaddress(){
        this.accountService.getaddress(this.user.userId).subscribe(res =>{
          this.useraddress = res;
          if(this.useraddress.length == 0){
             this.noaddress = true;
          }
          if(this.useraddress.length > 0){
           this.model = this.useraddress[0];
          }
          console.log("get address",this.useraddress.length);
       });

  }


  editaddress(){
    this.editmode = !this.editmode;
    this.noaddress = !this.noaddress;
  }




}
