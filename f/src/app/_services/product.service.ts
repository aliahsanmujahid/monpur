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

  getProduct(id: string) {

    const product = [...this.productCache.values()]
    .reduce((arr, elem) => arr.concat(elem), [])
    .find((product: Product) => product.id === Number(id));

    if (product) {
      return of(product);
    }
    return this.http.get<Product>(this.baseUrl + 'getsingleproduct/' + Number(id));
  }
  getEditProduct(id: number) {
    return this.http.get<any>(this.baseUrl + 'getsingleproduct/' + Number(id));
  }



  getSellerProduct(id) {

    return this.http.get<Product[]>(this.baseUrl + 'getsellerproducts/' + Number(id));
  }

  getcolors(id){
    return this.http.get<Colors[]>(this.baseUrl + 'getcolors/' + Number(id));
  }
  getsizes(id){
    return this.http.get<Sizes[]>(this.baseUrl + 'getsizes/' + Number(id));
  }








  searchProducts(key,sortby){
    return this.http.get<Product>(this.baseUrl + 'searchproducts/' + key + '/' + sortby);
  }
  getcateproducts(id,sortby) {

    return this.http.get<Product[]>(this.baseUrl + 'getcateproducts/' + Number(id));
  }
  getsubcateproducts(id,sortby) {

    return this.http.get<Product[]>(this.baseUrl + 'getsubcateproducts/' + Number(id));
  }

}
