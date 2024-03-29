import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IOrder, Order } from '../_models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  baseUrl = environment.apiUrl;
  skip = environment.skip;
  filterorder = [];


  customerorderCache = new Map();

  constructor(private http: HttpClient) { }

  orderCreate(orderform) {
    return this.http.post<any>(this.baseUrl + 'createorder', orderform);
  }

  orderQuantityCheck(items) {
    return this.http.post(this.baseUrl + 'orders/ordercheck', items);
  }

  searchorder(oid,uid) {
    return this.http.get<Order[]>(this.baseUrl + 'searchorder/' + oid +'/' + uid);
  }



  getOrderById(id: number) {
    return this.http.get<any>(this.baseUrl + 'getorderbyid/' + id);
  }


  deleteOrder(id: number) {
    return this.http.delete(this.baseUrl + 'orders/deleteOrder/' + id);
  }

  getSellerOrders(id: number,page: number,status:string) {
    return this.http.get<IOrder[]>(this.baseUrl + 'getSellerOrders/' + id + '/' +page+'/'+status);
  }

  getCustomerOrders(id: number,page: number,status:string,neworder) {
    if(neworder){
      this.customerorderCache = new Map();
    }
    var response = this.customerorderCache.get(Object.values(page+status).join('-'));
    if(page == 1 && response){
       this.filterorder = [];
       for (var i = 0; i < this.skip; i++) {
         if(response[i]){
           this.filterorder.push(response[i]);
         }
       }

       return of(this.filterorder);
     }
     if (response && page !== 1) {
       return of(response);
     }else{
      return this.http.get<IOrder[]>(this.baseUrl + 'getCustomerOrders/' + id +'/' +page+'/'+status).pipe(map(response => {
        this.customerorderCache.set(Object.values(page+status).join('-'), response);
        return response;
      }))
    }

  }


  changeStatus(id: number,userid: number,status:string) {
    return this.http.post(this.baseUrl + '/changeStatus/' + id +'/' + userid +'/' +status,{});
  }
  getorderbystatus(userid: number,sortby:string) {
    return this.http.get<any>(this.baseUrl + '/getorderbystatus/' + userid +'/' + sortby);
  }


  changecutomerstatus(id: number,userid: number,status:string) {
    return this.http.put(this.baseUrl + 'orders/changecutomerstatus/' + id +'/' + userid +'/' +status,{});
  }








  setcod(id: number) {
    return this.http.get<any>(this.baseUrl + 'setcod/' + id);
  }
  setpaypal(id: number) {
    return this.http.get<any>(this.baseUrl + 'setpaypal/' + id);
  }
  setstripe(data: any):Observable<any> {
    return this.http.post<any>(this.baseUrl + 'setstripe/',data);
  }


}
