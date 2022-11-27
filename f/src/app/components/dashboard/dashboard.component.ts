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

  show = 'copuns';

  ngOnInit(): void {

    this.route.params.subscribe(params => {

      window.scrollTo(0, 0);

      if (Object.keys(params).length !== 0) {
        this.producteditid = params['editproduct'];
        this.show = 'createproduct';
      }

    });

  }


  showgroup(s){
    this.router.navigateByUrl('/dash');
    this.producteditid = 0;
    this.show = s;
  }


  logout() {
    this.router.navigateByUrl('/dash');
    this.accountService.logout();
  }

}
