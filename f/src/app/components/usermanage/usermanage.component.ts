import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-usermanage',
  templateUrl: './usermanage.component.html',
  styleUrls: ['./usermanage.component.css']
})
export class UsermanageComponent implements OnInit {

  search='';
  users:any;
  selectuser:any = {
    id:0,
    userrole:''
  };

  constructor(public accountService: AccountService) { }

  alert = false;

  ngOnInit(): void {
    this.accountService.getadminmoderator().subscribe(res => {
     this.users = res;
     console.log("users", this.users);
    });
  }



  alerttoggle(user){
    this.alert = !this.alert;
    if(user !== null){
      this.selectuser.id = user.id;
      this.selectuser.userrole = user.role;
    }else{
      this.selectuser = {
        id:0,
        userrole:''
      };
    }
  }

  searchUser(){

  }

  setadminmoderator(){
    this.accountService.setadminmoderator(this.selectuser).subscribe(res =>{
          console.log("update res",res);
          let user =  this.users.find(x => x.id == res.id);
          user.role = res.role;
    });
  }



}
