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
  orderst:any = '';

  show = "review";
  view = 0;

  ngOnInit(): void {

    this.accountService.currentUser$.subscribe(res =>{
      this.show = "review"
    });

    this.route.params.subscribe(params => {
      window.scrollTo(0, 0);
      if (Object.keys(params).length !== 0) {
        this.producteditid = params['editproduct'];
        this.show = 'createproduct';

      }
      if (Object.keys(params).length !== 0) {
        this.orderst = params['order'];
        this.show = 'manageorder';
      }
      if (Object.keys(params).length !== 0) {
        if( params['track'] == '1'){
          this.show = 'order';
        }
      }



    });

  }


  showgroup(i,s){
    this.router.navigateByUrl('/dash');
    this.producteditid = 0;
    this.show = s;
    if(this.view == i){
      this.view = 0;
     }else{
      this.view = i;
     }
  }



  logout() {
    this.router.navigateByUrl('/dash');
    this.accountService.logout();
  }

}
