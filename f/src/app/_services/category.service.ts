import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseUrl = environment.apiUrl;
  skip = environment.skip;

  constructor(private http: HttpClient) { }


  createcate(model) {
    return this.http.post(this.baseUrl + 'createcate/', model);
  }

  createsubcate(model) {
    return this.http.post(this.baseUrl + 'createsubcate/', model);
  }

  getcategoryes() {
    return this.http.get(this.baseUrl + 'getcategoryes/');
  }

  getallsubcate() {
    return this.http.get(this.baseUrl + 'getallsubcate/');
  }
  getsubcatebyid(id) {
    return this.http.get(this.baseUrl + 'getsubcatebyid/'+ id);
  }

  getallcate() {
    return this.http.get(this.baseUrl + 'getallcate/');
  }




}
