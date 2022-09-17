export interface IOrder {
    name: string;
    phone: string;
    address: string;
    district: string;
    upazila: string;
    cashOnDelevary:string;
    sellerid:number;
    orderItems:IOrderItem[]
}

export interface IOrderItem {
    id: number;
    productName: string;
    price: number;
    quantity: number;
}
