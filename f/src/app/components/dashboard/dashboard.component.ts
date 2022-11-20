import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public accountService: AccountService,private route: ActivatedRoute,
    private router: Router) { }

  producteditid:any = 0;
  createproductview:Boolean = false;
  sellerproductview:Boolean = false;
  profileview:Boolean = false;
  messageview:Boolean = false;
  orderview:Boolean = false;
  cateview:Boolean = false;
  dashboard:Boolean = false;
  manageorderview:Boolean = false;
  paymentmanageview:Boolean = false;
  usermanageview:Boolean = false;
  copunsview:Boolean = false;
  sliderview:Boolean = false;
  footerview:Boolean = true;

  ngOnInit(): void {

    this.route.params.subscribe(params => {

      window.scrollTo(0, 0);

      if (Object.keys(params).length !== 0) {
        this.producteditid = params['editproduct'];
        this.createproductview = true;
      }

    });

  }

  slidermessage(){
    this.router.navigateByUrl('/dash');
    this.copunsview = false;
    this.usermanageview = false;
    this.paymentmanageview = false;
    this.dashboard = false;
    this.profileview = false;
    this.createproductview = false;
    this.sellerproductview = false;
    this.messageview = false;
    this.orderview = false;
    this.cateview = false;
    this.sliderview = true;
  }

  footermanagment(){
    this.router.navigateByUrl('/dash');
    this.footerview = true;
    this.copunsview = false;
    this.usermanageview = false;
    this.paymentmanageview = false;
    this.dashboard = false;
    this.profileview = false;
    this.createproductview = false;
    this.sellerproductview = false;
    this.messageview = false;
    this.orderview = false;
    this.cateview = false;
  }
  copunmanagment(){
    this.router.navigateByUrl('/dash');
    this.copunsview = true;
    this.usermanageview = false;
    this.paymentmanageview = false;
    this.dashboard = false;
    this.profileview = false;
    this.createproductview = false;
    this.sellerproductview = false;
    this.messageview = false;
    this.orderview = false;
    this.cateview = false;
  }

  usermanagment(){
    this.router.navigateByUrl('/dash');
    this.usermanageview = true;
    this.paymentmanageview = false;
    this.dashboard = false;
    this.profileview = false;
    this.createproductview = false;
    this.sellerproductview = false;
    this.messageview = false;
    this.orderview = false;
    this.cateview = false;
  }

  paymentmanagment(){
    this.router.navigateByUrl('/dash');
    this.paymentmanageview = true;
    this.dashboard = false;
    this.profileview = false;
    this.createproductview = false;
    this.sellerproductview = false;
    this.messageview = false;
    this.orderview = false;
    this.cateview = false;
  }

  manageorder(){
    this.router.navigateByUrl('/dash');
    this.manageorderview = true;
    this.dashboard = false;
    this.profileview = false;
    this.createproductview = false;
    this.sellerproductview = false;
    this.messageview = false;
    this.orderview = false;
    this.cateview = false;
  }


  viewdashboard(){
    this.router.navigateByUrl('/dash');
    this.dashboard = true;
    this.manageorderview = false;
    this.profileview = false;
    this.createproductview = false;
    this.sellerproductview = false;
    this.messageview = false;
    this.orderview = false;
    this.cateview = false;
  }

  viewprofile(){
    this.router.navigateByUrl('/dash');
    this.profileview = true;
    this.dashboard = false;
    this.manageorderview = false;
    this.createproductview = false;
    this.sellerproductview = false;
    this.messageview = false;
    this.orderview = false;
    this.cateview = false;

  }

  createproduct(){
    this.router.navigateByUrl('/dash');
    this.createproductview = true;
    this.manageorderview = false;
    this.dashboard = false;
    this.sellerproductview = false;
    this.profileview = false;
    this.messageview = false;
    this.orderview = false;
    this.cateview = false;
    this.producteditid = 0;
  }

  sellerproduct(){
    this.router.navigateByUrl('/dash');
    this.sellerproductview = true;
    this.dashboard = false;
    this.manageorderview = false;
    this.createproductview = false;
    this.profileview = false;
    this.messageview = false;
    this.orderview = false;
    this.cateview = false;
    this.producteditid = 0;
  }
  viewmessage(){
    this.router.navigateByUrl('/dash');
    this.messageview = true;
    this.dashboard = false;
    this.sellerproductview = false;
    this.createproductview = false;
    this.manageorderview = false;
    this.profileview = false;
    this.orderview = false;
    this.cateview = false;
  }
  sellerorder(){
    this.router.navigateByUrl('/dash');
    this.orderview = true;
    this.dashboard = false;
    this.messageview = false;
    this.sellerproductview = false;
    this.createproductview = false;
    this.profileview = false;
    this.cateview = false;
    this.manageorderview = false;
  }
  createcate(){
    this.router.navigateByUrl('/dash');
    this.orderview = false;
    this.messageview = false;
    this.sellerproductview = false;
    this.createproductview = false;
    this.profileview = false;
    this.dashboard = false;
    this.manageorderview = false;
    this.cateview = true;
  }

  logout() {
    this.router.navigateByUrl('/dash');
    this.accountService.logout();
  }

}
