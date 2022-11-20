import { IBasket, IBasketItem, IBasketTotals } from './_models/basket';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from './_services/account.service';
import { BasketService } from './_services/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

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
