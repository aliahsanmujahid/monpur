import { Component } from '@angular/core';
import { AccountService } from './_services/account.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public accountService: AccountService) { }


  ngOnInit(): void {

    this.setCurrentUser();

  }

  setCurrentUser() {
    const token = localStorage.getItem('monpuruser');
    if(token){
      this.accountService.setUser(token);
    }
  }
}
