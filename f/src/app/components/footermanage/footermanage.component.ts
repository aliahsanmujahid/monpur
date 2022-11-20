import { Component, OnInit } from '@angular/core';
import { Editor } from 'ngx-editor';
import { SettingsService } from 'src/app/_services/settings.service';

@Component({
  selector: 'app-footermanage',
  templateUrl: './footermanage.component.html',
  styleUrls: ['./footermanage.component.css']
})
export class FootermanageComponent implements OnInit {

  editor: Editor;
  editor2: Editor;

  constructor(public settingsService: SettingsService) { }

  model = {
    id:0,
    address:'',
    email1:'',
    email2:'',
    phone1:'',
    phone2:'',
    fb:'',
    tw:'',
    ins:'',
    android:'',
    iphone:''
  }
  terms = {
    id:0,
    term:'',
  };

  ngOnInit(): void {
    this.editor = new Editor();
    this.editor2 = new Editor();

    this.settingsService.getfooter().subscribe( res => {
      console.log(res);
      if(res){
        this.model = res;

      }
    });


    this.settingsService.getterm().subscribe( res => {
      console.log("terms res",res);
      if(res){
        this.terms = res;
      }
    });
  }
  ngOnDestroy(): void {
    this.editor.destroy();
    this.editor2.destroy();
  }


  createfooter(){
    this.settingsService.createfooter(this.model).subscribe(res =>{
      console.log("create res", res);
    });
  }

  updatefooter(){
    this.settingsService.updatefooter(this.model).subscribe(res =>{
      console.log("create res", res);
    });
  }



  createterm(){
    console.log("terms ",this.terms);
    this.settingsService.createterm(this.terms).subscribe(res =>{
      console.log("create res", res);
    });
  }

  updateterm(){
    console.log("terms update",this.terms);
    this.settingsService.updateterm(this.terms).subscribe(res =>{
      console.log("terms update res", res);
    });
  }

}
