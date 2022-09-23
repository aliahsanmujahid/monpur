import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  search:string;

  constructor(public accountService: AccountService,private router: Router) { }

  ngOnInit(): void {
  }

  searchProduct(){
    this.router.navigate(['products', { 'search':this.search }]);
  }



}
