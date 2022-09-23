import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public accountService: AccountService) { }

  createproductview:Boolean = false;
  sellerproductview:Boolean = false;
  profileview:Boolean = false;
  messageview:Boolean = false;
  orderview:Boolean = true;
  cateview:Boolean = false;

  ngOnInit(): void {
  }

  viewprofile(){
    this.profileview = true;
    this.createproductview = false;
    this.sellerproductview = false;
    this.messageview = false;
    this.orderview = false;
    this.cateview = false;
  }

  createproduct(){
    this.createproductview = true;
    this.sellerproductview = false;
    this.profileview = false;
    this.messageview = false;
    this.orderview = false;
    this.cateview = false;
  }

  sellerproduct(){
    this.sellerproductview = true;
    this.createproductview = false;
    this.profileview = false;
    this.messageview = false;
    this.orderview = false;
    this.cateview = false;
  }
  viewmessage(){
    this.messageview = true;
    this.sellerproductview = false;
    this.createproductview = false;
    this.profileview = false;
    this.orderview = false;
    this.cateview = false;
  }
  sellerorder(){
    this.orderview = true;
    this.messageview = false;
    this.sellerproductview = false;
    this.createproductview = false;
    this.profileview = false;
    this.cateview = false;
  }
  createcate(){
    this.orderview = false;
    this.messageview = false;
    this.sellerproductview = false;
    this.createproductview = false;
    this.profileview = false;
    this.cateview = true;
  }

  logout() {
    this.accountService.logout();
  }

}
