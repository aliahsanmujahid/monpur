import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
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

  register(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map((user: any) => {
        if (user) {
          this.setCurrentUser(user);
          this.router.navigateByUrl('shop');
          return user;
        }
      })
    )
  }


setCurrentUser(token: any) {

    const user = this.getDecodedToken(token);
   // console.log("res user",user);
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
      id =  user.userid
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

  }
  logout2() {
    localStorage.removeItem('eidhatuser');
    this.currentUserSource.next(null);
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






  signup(model: any) {
    return this.http.post(this.baseUrl + 'account/signup', model).pipe(
      map((response: User) => {
        this.setCurrentUser(response);
        return response;
      //  location.reload();
      })
    )
  }
  forgetpass(model: any) {
    return this.http.post(this.baseUrl + 'account/forgetpass', model).pipe(
      map((response: User) => {
        this.setCurrentUser(response);
        return response;
        // location.reload();
      })
    )
  }
  phonelogin(model: any) {
    return this.http.post(this.baseUrl + 'account/phonelogin', model).pipe(
      map((response: User) => {
        this.setCurrentUser(response);
        return response;
        // location.reload();
      })
    )
  }






}
