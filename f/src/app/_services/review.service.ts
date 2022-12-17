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
    return this.http.post<any>(this.baseUrl + 'createreview/', model);
  }
  updatereview(model) {
    return this.http.post<any>(this.baseUrl + 'updatereview/', model);
  }

  getallreviews(id,page) {
    return this.http.get<any>(this.baseUrl + 'getallreviews/' + id  + '/' + page);
  }
  getreview(id) {
    return this.http.get<any>(this.baseUrl + 'getreview/' + id);
  }



  changestatus(id,s) {
    return this.http.post<any>(this.baseUrl + 'changestatus/' + id + '/' + s , {});
  }

  getreviewbys(s,page) {
    return this.http.get<any>(this.baseUrl + 'getreviewbys/' + s + '/' + page);
  }

}
