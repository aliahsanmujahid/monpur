import { Basket, IBasketItem, IBasketTotals, cartProduct } from './../_models/basket';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IBasket } from '../_models/basket';
import {v4 as uuid4} from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  baseUrl = environment.apiUrl;
  private basketSource = new BehaviorSubject<IBasket>(null);
  basket$ = this.basketSource.asObservable();
  private basketTotalSource = new BehaviorSubject<IBasketTotals>(null);
  basketTotal$ = this.basketTotalSource.asObservable();

  delevary = 50;


  constructor() { }

  getBasket() {
    const basket: Basket = JSON.parse(localStorage.getItem('basket'));
    if(basket){
    this.basketSource.next(basket);
    this.calculateTotals();
    }
  }

  setBasket(basket: IBasket) {
    this.basketSource.next(basket);
    this.calculateTotals();
    return localStorage.setItem('basket', JSON.stringify(basket));

  }

  getCurrentBasketValue() {
    return this.basketSource.value;
  }


  addItemToBasket(item: cartProduct, quantity = 1) {
    const check = this.getCurrentBasketValue();
    if(check !== null && check.sellerid !== item.sellerid){
     this.basketSource.next(null);
     this.basketTotalSource.next(null);
     localStorage.removeItem('basket');
     console.log('Basket Deleted','Need To Be Same Shop');
    }
    const itemToAdd: IBasketItem = this.mapProductItemToBasketItem(item, quantity);
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.sellerid = item.sellerid;
    basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
    this.setBasket(basket);
  }

  private addOrUpdateItem(items: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[] {

    const item = items.filter(i => i.id === itemToAdd.id);

    console.log("item",item);

    console.log("itemToAdd",itemToAdd);


    if(item.length == 0){
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    }else{


      console.log("same product",item,itemToAdd);

      var same = 0;


      item.forEach( p => {

        if((p.vari?.values?.length == 0 && itemToAdd.vari?.values?.length == 0) && (p.mixedvari?.values?.length == 0 && itemToAdd.mixedvari?.values?.length == 0)){
          if((p.id == itemToAdd.id)){
            same = 1;
            console.log("only same",same);
           }
        }

        if(p.mixedvari?.values?.length > 0 && itemToAdd.mixedvari?.values?.length > 0){
          if(p.mixedvari?.values[0]?.vari1name == itemToAdd.mixedvari?.values[0]?.vari1name && p.mixedvari?.values[0]?.vari2name == itemToAdd.mixedvari?.values[0]?.vari2name){
            same = 1;
            console.log("mixedvari same",same);
        }
        }
        if((p.vari?.values?.length > 0 && itemToAdd.vari?.values?.length > 0)){
          if((p.vari?.values[0]?.id == itemToAdd.vari?.values[0]?.id)){
            same = 1;
            console.log("vari same",same);
           }
        }

      });

      if(same == 0){
        console.log("not same",same);
        items.push(itemToAdd);
      }



    }

    return items;
  }

  removeItemFromBasket(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    if (basket.items.some(x => x.eachid === item.eachid)) {
      basket.items = basket.items.filter(i => i.eachid !== item.eachid);
      if (basket.items.length > 0) {
        this.setBasket(basket);
      } else {
        this.deleteBasket();
      }
    }
  }
  incrementItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex(x => x.eachid === item.eachid);
    basket.items[foundItemIndex].quantity++;
    this.setBasket(basket);
  }

  decrementItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex(x => x.eachid === item.eachid);
    if (basket.items[foundItemIndex].quantity > 1) {
      basket.items[foundItemIndex].quantity--;
      this.setBasket(basket);
    }
    // else {
    //   this.removeItemFromBasket(item);
    // }
  }


  private createBasket(){
    const basket = new Basket();
    localStorage.setItem('basket', JSON.stringify(basket));
    return basket;
  }
  deleteBasket() {
    localStorage.removeItem('basket');
    this.basketSource.next(null);
    this.basketTotalSource.next(null);
  }

  private calculateTotals() {

    const basket = this.getCurrentBasketValue();

    const subtotal = basket.items.reduce((a, b) => (b.price * b.quantity) + a, 0);

    const totalqty = basket.items.reduce((a, b) => (b.quantity) + a, 0);

    this.basketTotalSource.next({subtotal,totalqty});

  }

  private mapProductItemToBasketItem(item: cartProduct, quantity: number): IBasketItem {
    console.log("cart item",item);
    return {
      eachid: uuid4(),
      id: item.id,
      productName: item.name,
      price: item.price,
      pictureUrl: item.file1,
      quantity,
      sku:item.sku,
      personalization:item.personalization,
      vari : item.vari,
      mixedvari:item.mixedvari

    }
  }
}
