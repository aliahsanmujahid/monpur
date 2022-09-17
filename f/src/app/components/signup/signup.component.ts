import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModelS } from 'src/app/_models/model';
import { UserS } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public accountService: AccountService,private router: Router) { }

  model: ModelS ={
    phonenumber:null,
    otp:null
  };
  setaccount: UserS = {
    pnumber:null,
    name:'',
    password:''
  }

  otpsended: Boolean = false;
  message: string = null;
  verified: Boolean = false;
  signupform:Boolean = true;
  haveac: Boolean = false;

  ngOnInit(): void {
  }


  otpsend(){
    if(this.model.otp == null){
      this.accountService.sendotp(this.model).subscribe( res =>{
        if(res.otpsended == true){
          this.otpsended = true;
          this.signupform = false;
          this.message = res.message;
        }
        if(res.verified == true){
          this.verified = true;
          this.otpsended = false;
          this.signupform = false;
          this.message = res.message;
        }
        if(res.haveac == true){
         // this.router.navigate(['login']);
          this.haveac = true;
          this.verified = false;
          this.otpsended = false;
          this.signupform = false;
        }
        console.log("otp res,", res);
      });
    }

  }
  signup(){
    if(this.model.otp && this.model.phonenumber){
      this.accountService.signup(this.model).subscribe(res =>{
        if(res.verified == true){
          this.verified = true;
          this.otpsended = false;
          this.signupform = false;
          this.message = res.message;
        }
        console.log("res res",res);
      });
    }
    console.log("this.model",this.model);
  }

  setac(){

    this.setaccount.pnumber = this.model.phonenumber;

    if(this.setaccount.pnumber !== null){
      this.accountService.setac(this.setaccount).subscribe(res =>{
        console.log("set ac",res);
        this.router.navigate(['']);
      });
    }
    // console.log("set ac", this.setaccount);
  }

}
