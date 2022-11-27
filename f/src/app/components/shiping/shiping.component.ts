import { AccountService } from './../../_services/account.service';
import { HttpEventType, HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SettingsService } from 'src/app/_services/settings.service';

@Component({
  selector: 'app-shiping',
  templateUrl: './shiping.component.html',
  styleUrls: ['./shiping.component.css']
})
export class ShipingComponent implements OnInit {


  constructor(private http: HttpClient,public accountService: AccountService,public settingsService: SettingsService) { }


  model = {
    id:0,
    title:'',
    value:0
  }

  shipings = [];

  alert = false;

  ngOnInit(): void {
    this.getshiping();
  }


  alerttoggle(){
    this.alert = !this.alert;
    this.model = {
      id:0,
      title:'',
      value:0
    }
  }

  createshiping(){
    this.settingsService.createshiping(this.model).subscribe(res => {
       this.shipings.push(res);
       this.alert = !this.alert;
    });
  }

  updateshiping(){
    this.settingsService.updateshiping(this.model).subscribe(res => {
      let ship =  this.shipings.find(x => x.id == res.id);
      ship = res;
      this.alert = !this.alert;
    });
  }
  updatetoggle(item){
    this.model = item;
    this.alert = !this.alert;
  }

  getshiping(){
    this.settingsService.getshiping().subscribe(res => {
      this.shipings = res;
      console.log(res);
    });
  }

}
