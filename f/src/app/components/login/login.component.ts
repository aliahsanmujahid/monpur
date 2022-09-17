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

  loginmodel: ModelL ={
    pnumber: null,
    password:'',
  };

  constructor(public accountService: AccountService,private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
  }

  login(){
    this.accountService.login(this.loginmodel).subscribe(response => {
      if(response){
        this.router.navigateByUrl('dash');
       }
    }, error => {
      //this.toastr.error("Wrong Number or Password");
    })
  }
}
