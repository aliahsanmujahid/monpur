import { AccountService } from './../../_services/account.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/_services/settings.service';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';

@Component({
  selector: 'app-slidermanage',
  templateUrl: './slidermanage.component.html',
  styleUrls: ['./slidermanage.component.css']
})
export class SlidermanageComponent implements OnInit {

  imglink = environment.imgUrl;

  constructor(private http: HttpClient,public accountService: AccountService,public settingsService: SettingsService) { }


  model = {
    id:0,
    img:'',
    title:'',
    heading:'',
    buttontext:'',
    buttonlink:''
  }

  sliders = [];

  alert = false;
  message: string = null;
  progress: number = null;
  UserId: string;

  ngOnInit(): void {
    this.UserId = this.accountService.getuserid()
    this.getallsliders();
  }


  alerttoggle(){
    this.alert = !this.alert;
    this.model = {
      id:0,
      img:'',
      title:'',
      heading:'',
      buttontext:'',
      buttonlink:''
    }
  }

  createslider(){
    this.settingsService.createslider(this.model).subscribe(res => {
       this.sliders.push(res);
       this.alert = !this.alert;
    });
  }

  updateslider(){
    console.log("model ",this.model);
    this.settingsService.updateslider(this.model).subscribe(res => {
      let slider =  this.sliders.find(x => x.id == res.id);
      slider = res;
      this.alert = !this.alert;
      console.log("update res",res);
    });
  }
  updatetoggle(item){
    this.model = item;
    this.alert = !this.alert;
  }

  getallsliders(){
    this.settingsService.getallslider().subscribe(res => {
      this.sliders = res;
      console.log(res);
    });
  }









  public uploadFile = (files,val) => {

    this.progress = null;
    this.message = null;

    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload);
    formData.append('userId',this.UserId);


    this.http.post(this.imglink+'api/user/imageupload', formData, {reportProgress: true, observe: 'events'})
    .pipe(
      map((data: any) => {
        if (data.type === HttpEventType.UploadProgress)
        this.progress = Math.round(100 * data.loaded / data.total);
        else if (data.type === HttpEventType.Response) {
        this.message = 'Upload success.';

        console.log(" data.body.imagePath", data.body.imagePath);

        if(val == 1){
          this.model.img = data.body.imagePath
        }

      }})).subscribe();
  }


  deleteimage = async(path,val) =>{
    this.message = "Deleteing";
    this.progress = null;
    this.http.post(this.imglink+'api/user/deleteimage', {imagePath:path})
    .pipe(
      map((data: any) => {
        this.message = "Deleted";
          if(val == 1){
            this.model.img = ''
          }
      })
    ).subscribe();
   }

}
