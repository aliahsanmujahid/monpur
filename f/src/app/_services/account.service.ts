import { ModelS } from 'src/app/_models/model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, UserS } from '../_models/user';
import { map } from 'rxjs/operators';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  baseUrl = environment.apiUrl;
  public currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient,private router: Router,
    public messageService: MessageService) { }



  login(model: any) {
    return this.http.post(this.baseUrl + '/signin', model).pipe(
      map((res: any) => {
        this.setCurrentUser(res.jwtToken);
        return res;
      })
    )
  }

  signup(model: any) {
    return this.http.post(this.baseUrl + 'signup', model).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  setac(model: UserS) {
    return this.http.post(this.baseUrl + 'setac', model).pipe(
      map((res: any) => {
        this.setCurrentUser(res.jwtToken);
        return res;
      })
    );
  }

  sendotp(model) {
    return this.http.post(this.baseUrl + 'sendotp', model).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  fsetac(model) {
    return this.http.post(this.baseUrl + 'fsetac', model).pipe(
      map((res: any) => {
        return res;
      })
    );
  }

  fsendotp(model) {
    return this.http.post(this.baseUrl + 'fsendotp', model).pipe(
      map((res: any) => {
        return res;
      })
    );
  }


setCurrentUser(token: any) {

    const user = this.getDecodedToken(token);
    localStorage.setItem('monpuruser', token);
    this.currentUserSource.next(user);
  }

  setUser(token) {

    this.setCurrentUser(token);

    // if (user) {
    //   if(user.roles.some(x => x === "Seller")){
    //     // this.router.navigateByUrl('/user/seller/'+user.id);
    //   }
    //   if(user.roles.some(x => x === "Member")){
    //     this.router.navigateByUrl('');
    //   }
    // }
  }
  getuserid(){
    var id;
    this.currentUser$.subscribe(user => {
      if(user){
        id =  user.userId
      }
    })
    return id
  }

  getDecodedToken(token) {
    return JSON.parse(atob(token.split('.')[1]));
  }


  logout() {
    window.scrollTo(0, 0);
    localStorage.removeItem('monpuruser');
    this.currentUserSource.next(null);
    this.messageService.stopHubConnection();
    this.router.navigateByUrl('/login');

  }


  createaddress(model) {
    return this.http.post(this.baseUrl + 'address/createaddress', model);
  }
  changeName(name) {
    return this.http.post(this.baseUrl + 'Account/setname/' + name.name , {});
  }
  getaddress() {
    return this.http.get(this.baseUrl + 'address/getaddress/');
  }



  getadminmoderator() {
    return this.http.get(this.baseUrl + 'getadminmoderator/');
  }
  setadminmoderator(model) {
    return this.http.post<any>(this.baseUrl + 'setadminmoderator/',model);
  }




}
