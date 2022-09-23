import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Colors, IProduct, Product, Sizes } from '../_models/product';

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


  getallproducts() {
    var response = this.productCache.get("products");

    if(response){
      //console.log("Products getting from catch",response);
      return of(response);
    }

    return this.http.get(this.baseUrl + 'getallproducts').pipe(map(response => {

      this.productCache.set("products", response);
      return this.productCache.get("products");

    }));
  }

  getProduct(id: string) {

    const product = [...this.productCache.values()]
    .reduce((arr, elem) => arr.concat(elem), [])
    .find((product: Product) => product.id === Number(id));

    if (product) {
      return of(product);
    }
    return this.http.get<Product>(this.baseUrl + 'getsingleproduct/' + Number(id));
  }
  getEditProduct(id: string) {
    return this.http.get<Product>(this.baseUrl + 'getsingleproduct/' + Number(id));
  }

  searchProducts(key){
    return this.http.get<Product>(this.baseUrl + 'searchproducts/' + key);
  }

  getSellerProduct(id: string) {

    return this.http.get<Product[]>(this.baseUrl + 'getsellerproducts/' + Number(id));
  }

  getcolors(id){
    return this.http.get<Colors[]>(this.baseUrl + 'getcolors/' + Number(id));
  }
  getsizes(id){
    return this.http.get<Sizes[]>(this.baseUrl + 'getsizes/' + Number(id));
  }

}
