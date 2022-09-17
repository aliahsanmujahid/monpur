import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProduct, Product } from '../_models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = environment.apiUrl;
  token = localStorage.getItem('monpuruser');


  constructor(private http: HttpClient) { }

  createproduct(model: IProduct) {
    return this.http.post(this.baseUrl + 'createproduct', model).pipe(
      map((res: any) => {
        return res;
      })
    )
  }

  updateproduct(product: IProduct){
    return this.http.post(this.baseUrl + 'updateproduct',product);
   }


  getallproducts() {
    return this.http.get(this.baseUrl + 'getallproducts');
  }

  getProduct(id: string) {
    return this.http.get<Product>(this.baseUrl + 'getsingleproduct/' + Number(id));
  }

  getSellerProduct(id: string) {
    return this.http.get<Product[]>(this.baseUrl + 'getsellerproducts/' + Number(id));
  }

}
