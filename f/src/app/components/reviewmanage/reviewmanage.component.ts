import { ReviewService } from './../../_services/review.service';
import { Component, Input, OnInit } from '@angular/core';
import { AccountService } from 'src/app/_services/account.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reviewmanage',
  templateUrl: './reviewmanage.component.html',
  styleUrls: ['./reviewmanage.component.css']
})
export class ReviewmanageComponent {

  @Input() reviewst = -1;

  constructor(private reviewService: ReviewService,
    private accountService: AccountService) { }

  reviews: any = null;
  selectedreview: any = null;
  imglink = environment.imgUrl;

  alert = false;
  page = 0;

  status = null;

  setstatus = [
    {
      id:0,
      name: 'Pending',
    },
    {
      id:1,
      name: 'Approve',
    },
    {
      id:2,
      name: 'Reject',
    }

  ]

  ngOnChanges() {
    this.selectedreview = null;
    this.page = 0;
    if(this.reviewst !== -1){
      this.getreviewbys();
    }
  }



  getreviewbys(){
    this.reviewService.getreviewbys(this.reviewst,++this.page).subscribe( res =>{
      this.reviews = res
      console.log("getreviewbys----------",res);
    });
  }

  alerttoggle(){
    this.alert = !this.alert;
  }

  canceltoggle(){
    if(this.selectedreview !== null){
     this.status = this.selectedreview.isa;
    }
    this.alert = !this.alert;
  }

  showdetails(item){

    if(this.selectedreview?.id == item.id){
      this.selectedreview = null;
      this.status = null;
    }else{
      this.selectedreview = item;
      this.status = item.isa;
    }

    console.log("eree",this.status );

  }

  changestatus(){
    if(this.selectedreview !== null){
      this.reviewService.changestatus(this.selectedreview.id,this.status).subscribe(res => {

        var newo =  this.reviews.find(i => i.id == this.selectedreview.id);
        newo.isa = this.status;
        this.selectedreview.isa = this.status;
        this.alert = !this.alert;

     });
    }

  }

}
