import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Ipayment } from '../_models/payment';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  baseUrl = environment.apiUrl;
  skip = environment.skip;

  constructor(private http: HttpClient) { }


  createpaymentsettings(model) {
    return this.http.post<Ipayment>(this.baseUrl + 'createpaymentsettings/', model);
  }

  updatepaymentsettings(model) {
    return this.http.post<Ipayment>(this.baseUrl + 'updatepaymentsettings/', model);
  }

  getpaymentsettings() {
    return this.http.get<Ipayment>(this.baseUrl + 'getpaymentsettings/');
  }



  createcoupon(model) {
    return this.http.post<any>(this.baseUrl + 'createcoupon/', model);
  }

  updatecoupon(model) {
    return this.http.post<any>(this.baseUrl + 'updatecoupon/', model);
  }

  getallcopuns() {
    return this.http.get<any>(this.baseUrl + 'getallcopuns/');
  }

  getcopun(code){
    return this.http.get<any>(this.baseUrl + 'getcopun/' + code);
  }




  createslider(model) {
    return this.http.post<any>(this.baseUrl + 'createslider/', model);
  }

  updateslider(model) {
    return this.http.post<any>(this.baseUrl + 'updateslider/', model);
  }

  getallslider() {
    return this.http.get<any>(this.baseUrl + 'getallslider/');
  }








  createfooter(model) {
    return this.http.post<any>(this.baseUrl + 'createfooter/', model);
  }

  updatefooter(model) {
    return this.http.post<any>(this.baseUrl + 'updatefooter/', model);
  }

  getfooter() {
    return this.http.get<any>(this.baseUrl + 'getfooter/');
  }






  createterm(model) {
    return this.http.post<any>(this.baseUrl + 'createterm/', model);
  }

  updateterm(model) {
    return this.http.post<any>(this.baseUrl + 'updateterm/', model);
  }

  getterm() {
    return this.http.get<any>(this.baseUrl + 'getterm/');
  }





  getshiping() {
    return this.http.get<any>(this.baseUrl + 'getshiping/');
  }
  createshiping(model) {
    return this.http.post<any>(this.baseUrl + 'createshiping/', model);
  }
  updateshiping(model) {
    return this.http.post<any>(this.baseUrl + 'updateshiping/', model);
  }
}
