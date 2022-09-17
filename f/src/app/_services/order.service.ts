import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {


  constructor(private http: HttpClient) { }

  baseUrl = environment.apiUrl;


  orderCreate(orderform) {
    return this.http.post(this.baseUrl + 'createorder', orderform);
  }


}
