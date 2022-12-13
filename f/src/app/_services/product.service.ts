import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProduct, Imixvari, Ivari } from '../_models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = environment.apiUrl;
  token = localStorage.getItem('monpuruser');

  productCache = new Map();


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


  getallproducts(sortby) {


     var response = this.productCache.get("products"+sortby);

    if(response){
      return of(response);
    }

    return this.http.get(this.baseUrl + 'getallproducts/'+ Number(sortby)).pipe(map(response => {

      this.productCache.set("products"+sortby, response);
     return this.productCache.get("products"+sortby);

    }));
  }

  getsingleproduct(id) {

    let product = [...this.productCache.values()]
    .reduce((arr, elem) => arr.concat(elem), [])
    .find((product: IProduct) => product.id == id );

    if(product) {
      return of(product);
    }
    return this.http.get<IProduct>(this.baseUrl + 'getsingleproduct/' + id );
  }

  getEditProduct(id: number) {
    return this.http.get<any>(this.baseUrl + 'getsingleproduct/' + Number(id));
  }



  getSellerProduct(id) {

    return this.http.get<IProduct[]>(this.baseUrl + 'getsellerproducts/' + Number(id));
  }

  getmixedvari(id){
    return this.http.get<Imixvari>(this.baseUrl + 'getmixedvari/' + id);
  }
  getvari(id){
    return this.http.get<Ivari>(this.baseUrl + 'getvari/' + id);
  }






  searchProducts(key,sortby){
    return this.http.get<IProduct>(this.baseUrl + 'searchproducts/' + key + '/' + sortby);
  }
  getcateproducts(id,sortby) {

    return this.http.get<IProduct[]>(this.baseUrl + 'getcateproducts/' + Number(id));
  }
  getsubcateproducts(id,sortby) {

    return this.http.get<IProduct[]>(this.baseUrl + 'getsubcateproducts/' + Number(id));
  }



  getfavp(uid,page) {

    return this.http.get<IProduct[]>(this.baseUrl + 'getfavp/' + uid + '/' + page);
  }

  isfav(uid,pid) {
    return this.http.get<any>(this.baseUrl + 'isfav/' + uid + '/' + pid);
  }

  addfav(uid,pid){
    return this.http.post<any>(this.baseUrl + 'addfav/'+ uid + '/' + pid,{});
  }

  removefav(uid,pid){
    return this.http.post<any>(this.baseUrl + 'removefav/'+ uid + '/' + pid,{});
  }


}
