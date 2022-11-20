import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IBasket, IBasketItem, IBasketTotals } from 'src/app/_models/basket';
import { AccountService } from 'src/app/_services/account.service';
import { BasketService } from 'src/app/_services/basket.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  basket$: Observable<IBasket>;
  basketTotal$: Observable<IBasketTotals>;

  constructor(public accountService: AccountService,public basketService: BasketService) { }


  ngOnInit(): void {

    this.setCurrentUser();
    this.basketService.getBasket();
    this.basket$ = this.basketService.basket$;
    this.basketTotal$ = this.basketService.basketTotal$;

  }

  setCurrentUser() {
    const token = localStorage.getItem('monpuruser');
    if(token){
      this.accountService.setUser(token);
    }
  }



  decrementItemQuantity(item: IBasketItem) {
    this.basketService.decrementItemQuantity(item);
  }

  incrementItemQuantity(item: IBasketItem) {
    this.basketService.incrementItemQuantity(item);
  }

  removeBasketItem(item: IBasketItem) {
    this.basketService.removeItemFromBasket(item);
  }




}

