
export interface IBasket {
    sellerid:Number;
    sellername:string;
    items: IBasketItem[];
}

export interface IBasketItem {
    eachid: string,
    id: number;
    productName: string;
    price: number;
    quantity: number;
    pictureUrl: string;
    personalization:string;
    sku:string;
    vari1 : Vari;
    vari2 : Vari;
    mixedvari:Mixvari;
}

export class Basket {
    sellerid:number;
    sellername:string;
    items: IBasketItem[] = [];
}

export interface IBasketTotals {
    subtotal: number;
    totalqty: number;
}












export interface cartProduct {
  id: number;
  cateid:number;
  subcateid:number;
  name:string,

  price:number,
  tempprice:number,
  discount:number,
  quantity:number;
  sku:string,
  personalization:string,

  file1:string,

  sellerid:number,

  vari1 : Vari,
  vari2 : Vari
  mixedvari : Mixvari
}

export interface Vari {
  id: number,
  name:string;
  values:Values[]
}
export interface Values {
    id: number,
    name:string;
    quantity: number;
    price: number;
    sku: string;
}

export interface Mixvari {
  id: number,
  vari1:string;
  vari2:string;
  values:Mixvalues[]
}
export interface Mixvalues {
  id: number,
  vari1name:string;
  vari2name:string;
  quantity: number;
  price: number;
  sku: string;
}



