export interface IOrder {
    name: string;
    phone: string;
    email: string;
    address: string;
    message: string;
    city: string;
    state: string;
    zip:string;
    sellerid:number;

    shiptitle:string;
    shiping:number;
    shipingid:number;

    coupontitle:string;
    coupon:number;
    couponid:number;

    orderItems:OrderItem[]
}
export interface Order {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  message: string;
  city: string;
  state: string;
  zip:string;
  sellerid:number;


  shiptitle:string;
  shiping:number;
  shipingid:number;

  coupontitle:string;
  coupon:number;
  couponid:number;

  orderItems:OrderItem[]
}

export interface OrderItem {
    id: number;
    productName: string;
    pictureUrl: string;
    price: number;
    quantity: number;

    sku:string,
    personalization:string,
    vari : Vari,
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
