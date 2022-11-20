import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/_services/settings.service';

@Component({
  selector: 'app-copuns',
  templateUrl: './copuns.component.html',
  styleUrls: ['./copuns.component.css']
})
export class CopunsComponent implements OnInit {


  constructor(public settingsService: SettingsService) { }

  model = {
    id:0,
    code:'',
    minimun:0,
  }

  copuns:any = [];

  alert = false;

  ngOnInit(): void {

    this.getallcopuns();

  }

  copyMessage(val: string){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.innerText = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  alerttoggle(){
    this.alert = !this.alert;
    this.model = {
      id:0,
      code:'',
      minimun:0,
    }
  }

  creatcopun(){
    this.settingsService.createcoupon(this.model).subscribe(res => {
       this.copuns.push(res);
       this.alert = !this.alert;
    });
  }

  updatecopun(){
    this.settingsService.updatecoupon(this.model).subscribe(res => {
      let copun =  this.copuns.find(x => x.id == res.id);
      copun = res;
      this.alert = !this.alert;
    });
  }
  updatetoggle(item){
    this.model = item;
    this.alert = !this.alert;
  }

  getallcopuns(){
    this.settingsService.getallcopuns().subscribe(res => {
      this.copuns = res;
    });
  }
}
