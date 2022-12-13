import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  constructor(public accountService: AccountService) { }

  message: string = null;
  verify: Boolean = false;
  ownotp:Boolean = false;

  model = {
    pnumber:null
  };
  setaccount = {
    pnumber:null,
    otp:null,
    password:''
  }

  ngOnInit(): void {
  }

  otpsend(){
    if(this.model.pnumber !== null){
      this.accountService.fsendotp(this.model).subscribe( res =>{
        if(res.otpsended == true){
          this.verify = true;
          this.message = res.message;
        }
        if(res.ownotp == true){
          this.message = res.message;
          this.ownotp = true;
          this.verify = true;
        }
        console.log("otp res,", res);
      });
    }

  }

  sendagin(){
    if(this.model.pnumber !== null){
      this.accountService.ownotp(this.model).subscribe(res =>{
        console.log("sendagin---- ",res);
        if(res.otpsended == true){
          this.verify = true;
          this.message = res.message;
          this.message = res.message;
          this.ownotp = false;
        }
      });
    }
  }

  setac(){

    this.setaccount.pnumber = this.model.pnumber

    if(this.setaccount.otp !== null){
      this.accountService.fsetac(this.setaccount).subscribe(res =>{
        console.log("set ac",res);
      });
    }
     //console.log("set ac", this.setaccount);
  }
}
