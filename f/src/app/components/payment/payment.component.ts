import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { IOrder, Order } from 'src/app/_models/order';
import { OrderService } from 'src/app/_services/order.service';
import { environment } from 'src/environments/environment';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {


  public payPalConfig?: IPayPalConfig;

  imglink = environment.imgUrl;
  order: any;
  cashondelevart: Boolean = false;
  ifpaypal: Boolean = false;
  ifstripe: Boolean = false;
  alert = false;
  handler:any = null;

  constructor(private http: HttpClient,
    private route: ActivatedRoute,private router: Router,private orderService: OrderService) { }

  ngOnInit(): void {

    this.initConfig();
    this.loadStripe();

    this.route.params.subscribe(p => {
      if(p['id'] != undefined && p['id'] != null){
        console.log(p['id']);

        this.orderService.getOrderById(p['id']).subscribe(res =>{
          if(res.error){
            this.router.navigateByUrl("/");
          }
          this.order = res;

          console.log( " this.order ",this.order )
        });
      }

    });


  }
  alerttoggle(){
    this.alert = !this.alert;
  }



  private initConfig(): void {
    this.payPalConfig = {
    currency: 'USD',
    fundingSource: 'PAYPAL',
    clientId: 'AYFITpYJGo6QLIcjGV-M-ud3uGN7O_c2-PLgxb2Z2Z4Eu69dLPPnrs54rN2D1YaAO2L5lBZ2T7J5vxU9',
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: this.order.total,
            breakdown: {
              item_total: {
                currency_code: 'USD',
                value: this.order.total,
              }
            }
          },
          items: [
            {
              name: 'Order ID: '+this.order.id,
              quantity: '1',
              unit_amount: {
                currency_code: 'USD',
                value: this.order.total,
              },
            }
          ]
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      height: 50
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then(details => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
      });
    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      this.setpaypal(this.order.id);
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
    },
    onError: err => {
      console.log('OnError', err);
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  };
  }


  paycashondelevart(){
    this.cashondelevart = true;
    this.ifpaypal = false;
    this.ifstripe = false;
  }

  paybypaypal(){
    this.cashondelevart = false;
    this.ifpaypal = true;
    this.ifstripe = false;
  }
  paybystripe(){
    this.cashondelevart = false;
    this.ifpaypal = false;
    this.ifstripe = true;
  }


  setcod(id){
    this.orderService.setcod(id).subscribe(res =>{
      console.log("payment res",res)
      if(res.success == true){
          this.alert = !this.alert;
          this.order.cashondelevary = 1;
      }
    });
  }
  setpaypal(id){
    this.orderService.setpaypal(id).subscribe(res =>{
      console.log("payment res",res)
      if(res.success == true){
          this.order.ispaid = 1;
          this.order.paidbypaypal = 1;
      }
    });
  }




  stripePay(amount: any,orderid) {
    console.log("ddddddddddd");
    var submittedForm = false;
    var handler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51Lyl0HGLWGTnKxnYIxcuA0AyCOPasULLq0t9N7NrzxHiOTPajyuTisL35WWMg9oFf61yvVFqjCkP28z7SonaeBfa00I2r6zpsj',
      locale: 'auto',
      token: function (token: any) {
        // You can access the token ID with `token.id`.
        // Get the token ID to your server-side code for use.
        // console.log(token)
        // console.log('Token Created!!');
        submittedForm = true;
        const data = {
          token: token,
          orderid: orderid
        }

        setstripe(data);
      }
    });

    const setstripe = (data: any) => {
      this.orderService.setstripe(data).subscribe((res:any) =>{

        console.log("stripe res",res)


        if(res.success == true){
          this.order.ispaid = 1;
          this.order.paidbystripe = 1;
        }
      });
    }

    handler.open({
      name: 'Monpur Payment',
      // description: 'Order Id: '+this.order.id,
      amount: amount * 100,
      closed: function () {
        if(submittedForm == false)
            console.log("erer ererere ererer erer");
     }
    });

  }

  loadStripe() {

    if(!window.document.getElementById('stripe-script')) {
      var s = window.document.createElement("script");
      s.id = "stripe-script";
      s.type = "text/javascript";
      s.src = "https://checkout.stripe.com/checkout.js"
      s.onload = () => {
        this.handler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51Lyl0HGLWGTnKxnYIxcuA0AyCOPasULLq0t9N7NrzxHiOTPajyuTisL35WWMg9oFf61yvVFqjCkP28z7SonaeBfa00I2r6zpsj',
          locale: 'auto',
          token: function (token: any) {
            // You can access the token ID with `token.id`.
            // Get the token ID to your server-side code for use.
            console.log(token)
            console.log('Payment Success!!');
          }
        });
      }

      window.document.body.appendChild(s);
    }
  }




}
