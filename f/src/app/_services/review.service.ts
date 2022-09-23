import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  baseUrl = environment.apiUrl;
  skip = environment.skip;

  constructor(private http: HttpClient) { }


  createreview(model) {
    return this.http.post(this.baseUrl + 'createreview/', model);
  }
  
  getallreviews(id) {
    return this.http.get(this.baseUrl + 'getallreviews/' + id);
  }
}
