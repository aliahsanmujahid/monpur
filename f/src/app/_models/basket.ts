
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
}

export class Basket {
    sellerid:Number;
    sellername:string;
    items: IBasketItem[] = [];
}

export interface IBasketTotals {
    delevary: number;
    subtotal: number;
    total: number;
}
