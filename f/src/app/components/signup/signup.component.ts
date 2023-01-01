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
    pnumber:null,
    otp:null
  };
  setaccount: UserS = {
    pnumber:null,
    name:'',
    password:''
  }

  otpsended: Boolean = false;
  message: string = null;
  ownotp:Boolean = false;
  verified: Boolean = false;
  signupform:Boolean = true;
  haveac: Boolean = false;

  ngOnInit(): void {
  }


  otpsend(){
    if(this.model.otp == null){
      this.accountService.sendotp(this.model).subscribe( res =>{

        if(res.ownotp == true){
          this.otpsended = true;
          this.signupform = false;
          this.message = res.message;
          this.ownotp = true;
        }

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

  sendagin(){
    if(this.model.pnumber !== null){
      this.accountService.ownotp(this.model).subscribe(res =>{
        console.log("sendagin---- ",res);
        this.otpsended = true;
        this.signupform = false;
        this.message = res.message;
        this.ownotp = false;
      });
    }
  }


  signup(){
    if(this.model.otp && this.model.pnumber){
      this.accountService.signup(this.model).subscribe(res =>{
        if(res.verified == true){
          this.verified = true;
          this.otpsended = false;
          this.signupform = false;
          this.message = res.message;
        }
        if(res.nomach == false){
          this.message = res.message;
        }
        console.log("res res",res);
      });
    }
    console.log("this.model",this.model);
  }

  async setac(){
    this.setaccount.pnumber = this.model.pnumber;
    if(this.setaccount.pnumber !== null && this.setaccount.name !== "" && this.setaccount.password !== ""){
      (await this.accountService.setac(this.setaccount)).subscribe(res =>{
        console.log("set ac",res);
        this.router.navigate(['']);
      });
    }else{
      this.message = "Set All Fields";
    }
  }


}
