import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/_models/user';
import { ProductService } from 'src/app/_services/product.service';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-sellerproduct',
  templateUrl: './sellerproduct.component.html',
  styleUrls: ['./sellerproduct.component.css']
})
export class SellerproductComponent implements OnInit {

  products: any = [];
  userid: any;

  constructor(private route: ActivatedRoute,public productService: ProductService,
    public accountService: AccountService) { }

  ngOnInit(): void {

   this.userid =  this.accountService.getuserid()
   this.getSellerProduct(this.userid);

  }

  getSellerProduct(userid){
    this.products = [];
    this.productService.getSellerProduct(userid).subscribe( res =>{
      this.products = res;
    }),
    error => {
     console.log(error)
    };
  }




}
