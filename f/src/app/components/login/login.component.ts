import { FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelL } from 'src/app/_models/model';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: SocialUser = null;
  loggedIn: boolean;

  loginmodel: ModelL ={
    pnumber: null,
    password:'',
  };
  setaccount = {
    email:'',
    name:'',
    password:''
  }

  constructor(public accountService: AccountService,private route: ActivatedRoute,
    private router: Router,private socialAuthService: SocialAuthService) { }

  ngOnInit(){
    this.socialAuthService.authState.subscribe(async (user) => {
      this.user = user;

      if(this.user !== null){

        await this.emaillog();

      }

    });
  }

  async emaillog(){
    this.setaccount.email = this.user.email;
    this.setaccount.name = this.user.name;
    this.setaccount.password = 'poipoi';

    if(this.setaccount.email !== null && this.setaccount.name !== "" && this.setaccount.password !== ""){
      await this.accountService.emaillog(this.setaccount).subscribe(response => {

          this.accountService.setCurrentUser(response.jwtToken);
          console.log("response ",response)

      })
    }
  }

  login(){
    this.accountService.login(this.loginmodel).subscribe(response => {
      if(response){
        this.router.navigateByUrl('dash');
       }
    })
  }
}
