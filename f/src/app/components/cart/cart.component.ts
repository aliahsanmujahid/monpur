import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem, IBasketTotals } from 'src/app/_models/basket';
import { IOrder, OrderItem } from 'src/app/_models/order';
import { AccountService } from 'src/app/_services/account.service';
import { BasketService } from 'src/app/_services/basket.service';
import { OrderService } from 'src/app/_services/order.service';
import { SettingsService } from 'src/app/_services/settings.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  basket$: Observable<IBasket>;
  basketTotal$: Observable<IBasketTotals>;
  totalbasket: any = {}

  constructor(public accountService: AccountService,public basketService: BasketService,
    private orderService: OrderService,private router: Router,public settingsService: SettingsService) { }

  alert = false;
  alert2 = false;
  alert3 = false;

  noshiping = false;

  user:any={};
  cuponvalid: boolean = null;
  minvalid: boolean = false;
  coupondata:any = [];

  setaddress = false;
  shipings = [];


  showpersonalizationdata = '';

  addressmodel = {
    id:null,
    uid:'',
    name:'',
    phone:'',
    email:'',
    address:'',
    city:'',
    state:'',
    zip:''
  };

  orderCreate: IOrder = {
    name: '',
    phone: '',
    email: '',
    address: '',
    message: '',
    city: '',
    state: '',
    zip: '',
    sellerid:0,

    shiptitle:'',
    shiping:null,
    shipingid:null,

    coupontitle:'',
    coupon:null,
    couponid:null,

    orderItems:[]
  }


  ngOnInit(): void {

    this.accountService.currentUser$.subscribe( user => {
      if(user){
        this.user = user;
        this.addressmodel.uid = this.user.userId;
        console.log(user)
        this.getaddress();
      }
    });

    this.getshiping();
    this.basketService.getBasket();
    this.basket$ = this.basketService.basket$;
    this.basketTotal$ = this.basketService.basketTotal$;

    this.basketTotal$.subscribe( res =>{
      if(res){
        this.totalbasket = res;
      }
    });


    this.setOrderItems();

  }

  createorder(){
    // console.log("orderCreate",this.orderCreate);
    this.orderService.orderCreate(this.orderCreate).subscribe(res =>{

      console.log("order res",res);

      if(res.success == true){
          this.router.navigateByUrl("payment/"+res.orderid);
      }else{
        console.log("No Order");
      }

      // this.basketService.deleteBasket();
      window.scrollTo(0, 0);
    })
  }


  getshiping(){
    this.settingsService.getshiping().subscribe(res => {
      this.shipings = res;
      console.log(res);
    });
  }

  applycupon(){

    if(this.orderCreate.shiping == null){
      this.noshiping = true;
    }else{
      this.noshiping = false;
      this.orderCreate.coupontitle = this.orderCreate.coupontitle.toLowerCase()
      this.settingsService.getcopun(this.orderCreate.coupontitle).subscribe(res => {

        this.coupondata = res;
        if(res.length == 0){
           this.cuponvalid = false;
        }
        if(res.length > 0){

          if(this.totalbasket.subtotal < this.coupondata[0]?.minimun){
            this.cuponvalid = false;
            this.minvalid = true;
            this.orderCreate.coupontitle = '';
            this.orderCreate.couponid = null;
            this.orderCreate.coupon = null;
          }
          if(this.totalbasket.subtotal >= this.coupondata[0]?.minimun){
            this.orderCreate.coupontitle = this.coupondata[0].code;
            this.orderCreate.couponid = this.coupondata[0].id;
            this.orderCreate.coupon = this.coupondata[0].value;
            this.cuponvalid = true;
            this.minvalid = false;
          }

        }

      });
    }
  }

  selectship(item){
     this.noshiping = false;
     this.orderCreate.shipingid = item.id;
     this.orderCreate.shiptitle = item.title;
     this.orderCreate.shiping = item.value;
  }

  setaddressform(){
    this.setaddress = true;
    this.alert = !this.alert;


    console.log("address",this.addressmodel);
    console.log("address",this.orderCreate);

        this.addressmodel.name =  this.orderCreate.name;
        this.addressmodel.email =  this.orderCreate.email;
        this.addressmodel.phone =  this.orderCreate.phone;
        this.addressmodel.city =  this.orderCreate.city;
        this.addressmodel.state =  this.orderCreate.state;
        this.addressmodel.zip =  this.orderCreate.zip;
        this.addressmodel.address =  this.orderCreate.address;

    if(this.addressmodel.id == null){
      this.accountService.createaddress(this.addressmodel).subscribe(res =>{

     });
    }
    else{
      this.accountService.updateaddress(this.addressmodel).subscribe(res =>{

     });
    }

  }
  alerttoggle(){
    this.alert = !this.alert;
  }

  alerttoggle2(){
    this.alert2 = !this.alert2;
  }
  alerttoggle3(){
    this.alert3 = !this.alert3;
  }

  showpersonalization(data){
    this.alert3 = !this.alert3;
    this.showpersonalizationdata = data;
  }
  getaddress(){
    this.accountService.getaddress(this.user.userId).subscribe(res =>{
      if(res.length > 0){
        console.log("setting address");
        this.addressmodel = res[0];
        this.orderCreate.name =  this.addressmodel.name;
        this.orderCreate.email =  this.addressmodel.email;
        this.orderCreate.phone =  this.addressmodel.phone;
        this.orderCreate.city =  this.addressmodel.city;
        this.orderCreate.state =  this.addressmodel.state;
        this.orderCreate.zip =  this.addressmodel.zip;
        this.orderCreate.address =  this.addressmodel.address;
      }
      console.log("get address",res);
   });

}




  decrementItemQuantity(item: IBasketItem) {
    this.basketService.decrementItemQuantity(item);
    this.setOrderItems();

    if(this.totalbasket.subtotal < this.coupondata[0]?.minimun){
      this.cuponvalid = false;
      this.minvalid = true;
      this.orderCreate.coupontitle = '';
      this.orderCreate.couponid = null;
      this.orderCreate.coupon = null;
    }
    if(this.totalbasket.subtotal >= this.coupondata[0]?.minimun){
      this.orderCreate.coupontitle = this.coupondata[0]?.code;
      this.orderCreate.couponid = this.coupondata[0]?.id;
      this.orderCreate.coupon = this.coupondata[0]?.value;
      this.cuponvalid = true;
      this.minvalid = false;
    }

  }

  incrementItemQuantity(item: IBasketItem) {
    this.basketService.incrementItemQuantity(item);
    this.setOrderItems();

    if(this.totalbasket.subtotal < this.coupondata[0]?.minimun){
      this.cuponvalid = false;
      this.minvalid = true;
      this.orderCreate.coupontitle = '';
      this.orderCreate.couponid = null;
      this.orderCreate.coupon = null;
    }
    if(this.totalbasket.subtotal >= this.coupondata[0]?.minimun){
      this.orderCreate.coupontitle = this.coupondata[0]?.code;
      this.orderCreate.couponid = this.coupondata[0]?.id;
      this.orderCreate.coupon = this.coupondata[0]?.value;
      this.cuponvalid = true;
      this.minvalid = false;
    }

  }

  removeBasketItem(item: IBasketItem) {
    this.basketService.removeItemFromBasket(item);
    this.setOrderItems();
  }













  setOrderItems(){

    this.orderCreate.orderItems = [];

    const basket = JSON.parse(localStorage.getItem('basket'));


    console.log("basket",basket)


    this.orderCreate.sellerid = basket.sellerid;

    basket.items.forEach(item =>{

     const orderItem: OrderItem ={
        id:item.id,
        productName:item.productName,
        pictureUrl: item.pictureUrl,
        price: item.price,
        quantity: item.quantity,

        sku:item.sku,
        personalization:item.personalization,

        vari : {
          id: 0,
          name:'',
          values:[]
        },
        mixedvari:{
          id: 0,
          vari1:'',
          vari2:'',
          values:[]
        }

      }

      if(item.vari.values.length > 0){
        orderItem.vari = item.vari;
      }

      if(item.mixedvari.values.length  > 0){
        orderItem.mixedvari = item.mixedvari;
      }

      this.orderCreate.orderItems.push(orderItem);

    });



  }



}

