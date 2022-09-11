import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProduct } from '../_models/product';

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

}
