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
  reviewst:number = -1;
  track:boolean;

  show = "";
  view = 0;

  ngOnInit(): void {

    this.accountService.currentUser$.subscribe(res =>{
      this.show = "profile"
    });

    this.route.params.subscribe(params => {
      window.scrollTo(0, 0);
      if (Object.keys(params).length !== 0) {

        if(params['editproduct']){

          this.producteditid = params['editproduct'];
          this.show = 'createproduct';
        }
        if(params['order']){
          this.orderst = params['order'];
          this.show = 'manageorder';
        }
        if(params['track'] == '1'){
          this.track = true;
          this.show = 'order';
        }
        if(params['review']){
          this.reviewst = params['review'];
          this.show = 'review';
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
