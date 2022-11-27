import { OrderService } from './../../_services/order.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IBasket, IBasketTotals } from 'src/app/_models/basket';
import { IOrder, OrderItem } from 'src/app/_models/order';
import { AccountService } from 'src/app/_services/account.service';
import { BasketService } from 'src/app/_services/basket.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  imglink = environment.imgUrl;
  card = false;

  basket$: Observable<IBasket>;
  basketTotal$: Observable<IBasketTotals>;

  constructor(private router: Router,public basketService: BasketService,
    public accountService: AccountService, private orderService: OrderService) { }

  // orderCreate: IOrder = {
  //   name: '',
  //   phone: '',
  //   email: '',
  //   address: '',
  //   message: '',
  //   city: '',
  //   state: '',
  //   zip: '',
  //   sellerid:0,
  //   sku:'',
  //   personalization:'',
  //   shiping:0,
  //   orderItems:[]
  // }


  ngOnInit(): void {
    window.scrollTo(0, 0);

    if(!localStorage.getItem('basket')){
      this.router.navigateByUrl('');
    }else{
      this.basketService.getBasket();
      this.basket$ = this.basketService.basket$;
      this.basketTotal$ = this.basketService.basketTotal$;
      // this.setOrderItems();
    }
  }

  createorder(){

    // console.log("orderCreate",this.orderCreate);

    // this.orderService.orderCreate(this.orderCreate).subscribe(res =>{

    //   if(res.success == true){
    //       this.router.navigateByUrl("payment/"+res.orderid);
    //   }else{
    //     console.log("No Order");
    //   }

    //  // this.basketService.deleteBasket();
    //   window.scrollTo(0, 0);
    // })
  }
  onItemChange(value){
    console.log(" Value is : ", value.target.value );
  }

  // setOrderItems(){
  //   const basket = JSON.parse(localStorage.getItem('basket'));

  //   basket.items.forEach(item =>{

  //    const OrderItem: OrderItem ={
  //       id: 0,
  //       productName: '',
  //       pictureUrl: '',
  //       price: 0,
  //       quantity: 0,
  //       color_id:0,
  //       color_name:'',
  //       size_id:0,
  //       vari_name:'',
  //       size_name:'',

  //     }
  //     OrderItem.id = item.id;
  //     OrderItem.productName = item.productName;
  //     OrderItem.pictureUrl = item.pictureUrl;
  //     OrderItem.price = item.price;
  //     OrderItem.quantity = item.quantity;
  //     if(item.color.length !== 0){

  //       OrderItem.color_id = item.color[0].id;
  //       OrderItem.color_name = item.color[0].name;
  //     }
  //     if(item.size.length !== 0){
  //         OrderItem.size_id = item.size[0].id;
  //         OrderItem.vari_name = item.size[0].name;
  //         OrderItem.size_name = item.size[0].variCode;

  //     }

  //     this.orderCreate.orderItems.push(OrderItem);

  //   });
  //   this.orderCreate.sellerid = basket.sellerid;


  // }

  creditcard(what){
    this.card = what;
  }

}
