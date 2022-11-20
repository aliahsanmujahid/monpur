import { SettingsService } from './../../_services/settings.service';
import { Ipayment } from './../../_models/payment';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-paymentmanage',
  templateUrl: './paymentmanage.component.html',
  styleUrls: ['./paymentmanage.component.css']
})
export class PaymentmanageComponent implements OnInit {

  cod: boolean = false;
  paypal: boolean = false;
  paypalid: '';
  stripe: boolean = false;
  stripep: '';
  stripes: '';

  constructor(public settingsService: SettingsService) { }

  ngOnInit(): void {

    this.getpaymentsettings();


  }


  payment : Ipayment = {
    id:0,
    cod:'',
    paypalid:'',
    stripepkey:'',
    stripeskey:'',
  };



  getpaymentsettings(){
    this.settingsService.getpaymentsettings().subscribe( res => {
      if(res){
        this.payment = res;
      }
      console.log("getpayment",res);
    });
  }
  createpaymentsettings(){
    this.settingsService.createpaymentsettings(this.payment).subscribe( res => {
      console.log(res);
      if(res){
        this.payment = res;
      }
    });
  }
  updatepaymentsettings(){
    console.log("updatting");
    this.settingsService.updatepaymentsettings(this.payment).subscribe( res => {
      console.log("update",res);
      if(res){
        this.payment = res;
      }
    });
  }

  setstripe(){
    this.payment.stripepkey = this.stripep,
    this.payment.stripeskey = this.stripes

  }



  onPaymentset($event) {
    if ($event.target.checked){
      if($event.target.value == 'cod'){
          this.cod = true
          this.payment.cod = "true"
      }
      if($event.target.value == 'paypal'){
        this.paypal = true
      }
    if($event.target.value == 'stripe'){
      this.stripe = true
    }
    }
    else {
      if($event.target.value == 'cod'){
        this.cod = false
        this.payment.cod = "false"
      }
      if($event.target.value == 'paypal'){
        this.paypal = false
      }
      if($event.target.value == 'stripe'){
        this.stripe = false
      }
    }
  }

}
