import { OrderService } from './../../_services/order.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IBasket, IBasketTotals } from 'src/app/_models/basket';
import { IOrder, IOrderItem } from 'src/app/_models/order';
import { AccountService } from 'src/app/_services/account.service';
import { BasketService } from 'src/app/_services/basket.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  basket$: Observable<IBasket>;
  basketTotal$: Observable<IBasketTotals>;

  constructor(private router: Router,public basketService: BasketService,
    public accountService: AccountService, private orderService: OrderService) { }

  orderCreate: IOrder = {
    name: '',
    phone: '',
    address: '',
    district: '',
    upazila: '',
    cashOnDelevary:'',
    sellerid:0,
    orderItems:[]
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);

    if(!localStorage.getItem('basket')){
      this.router.navigateByUrl('');
    }else{
      this.basketService.getBasket();
      this.basket$ = this.basketService.basket$;
      this.basketTotal$ = this.basketService.basketTotal$;
      this.setOrderItems();
    }
  }

  createorder(){
    // console.log("this.orderCreate",this.orderCreate);
    this.orderService.orderCreate(this.orderCreate).subscribe(res =>{

      console.log("order res",res);
     // this.basketService.deleteBasket();
      window.scrollTo(0, 0);
    })
  }

  setOrderItems(){
    const basket = JSON.parse(localStorage.getItem('basket'));

    basket.items.forEach(item =>{

     const OrderItem: IOrderItem ={
        id: 0,
        productName: '',
        price: 0,
        quantity: 0,
      }
      OrderItem.id = item.id;
      OrderItem.productName = item.productName;
      OrderItem.price = item.price;
      OrderItem.quantity = item.quantity;

      this.orderCreate.orderItems.push(OrderItem);

    });
    this.orderCreate.sellerid = basket.shopId;


  }

}
