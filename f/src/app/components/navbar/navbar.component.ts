import { CategoryService } from 'src/app/_services/category.service';
import { IBasketTotals } from 'src/app/_models/basket';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/_services/account.service';
import { BasketService } from 'src/app/_services/basket.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  search:string;
  category: any = [];

  constructor(public categoryService: CategoryService,public accountService: AccountService,private router: Router,public basketService: BasketService) { }

  ngOnInit(): void {
    this.getCategoryes();
  }


  searchProduct(){
    this.router.navigate(['/products', { 'search':this.search }]);
  }

  getCategoryes(){

      this.categoryService.getcategoryes().subscribe( res => {
        this.category = res;
      })
  }

}
