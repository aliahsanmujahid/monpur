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
  verified: Boolean = false;

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
          this.verified = true;
          this.message = res.message;
        }
        console.log("otp res,", res);
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
