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
    color_id:number;
    color_name:string;
    size_id:number;
    vari_name:string;
    size_name:string;
}
