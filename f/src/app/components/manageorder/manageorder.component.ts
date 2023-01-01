import { environment } from 'src/environments/environment';
import { ReviewService } from './../../_services/review.service';
import { AccountService } from 'src/app/_services/account.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/_models/user';
import { OrderService } from 'src/app/_services/order.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { map } from 'rxjs';

@Component({
  selector: 'app-manageorder',
  templateUrl: './manageorder.component.html',
  styleUrls: ['./manageorder.component.css']
})
export class ManageorderComponent implements OnInit {

  @Input() orderst = '';

  imglink = environment.imgUrl;
  msgsendid = null;

  user: User;
  noorder = false;
  notfound = false;
  sheader = false;
  throttle = 0;
  distance = 1;
  page:number = 1;
  orderview  = false;
  stopscroll  = false;
  search:string = null;
  neworder = false;
  isreview = false;

  review = {
    pid:null,
    ratting:null,
    review:'',
    image1:'',
    image2:'',
    image3:'',
    image4:'',
  }

  orders: any = [];
  sorder: any = null;
  singleorder: any = [];
  selectedorder: any = null;
  sellerid: number;
  customerid: number;
  progress: number = null;
  message: string = null;
  alert = false;
  alert2 = false;
  alert3 = false;

  status = '';
  status2 = '';
  sortby = 'All';
  sorts = [
    {
      id:1,
      name: 'Paid',
    },
    {
      id:2,
      name: 'Not Paid',
    },
    {
      id:3,
      name: 'Pending',
    },
    {
      id:4,
      name: 'Approved',
    },
    {
      id:5,
      name: 'Delivering',
    },
    {
      id:6,
      name: 'Confirmed',
    },
    {
      id:7,
      name: 'Rejected',
    },
    {
      id:8,
      name: 'Guest User',
    },
    {
      id:9,
      name: 'All',
    }

  ]
  setstatus = [
    {
      id:1,
      name: 'Pending',
    },
    {
      id:2,
      name: 'Approved',
    },
    {
      id:3,
      name: 'Delivering',
    },
    {
      id:4,
      name: 'Rejected',
    }

  ]

  constructor(private route: ActivatedRoute,
    private accountService: AccountService,private http: HttpClient,
    private orderService: OrderService, private router: Router,
    private reviewService: ReviewService) { }


  ngOnInit(): void {
    window.scrollTo(0, 0);
    console.log("this.orderst-----------",this.orderst);

    this.accountService.currentUser$.subscribe(res =>{

        console.log("User: ",res);
         if(res){
          if(res.role == "admin"){
            this.sellerid = res.userId;
            this.getorders();
           }
         }

    });
  }


  ngOnChanges() {
    this.accountService.currentUser$.subscribe(res =>{

      console.log("User: ",res);
       if(res){
        if(res.role == "admin"){
          this.sellerid = res.userId;
         }
       }

    });

    if(this.orderst !== ''){
      console.log("this.orderst",this.orderst);
      this.orderService.getorderbystatus(this.sellerid,this.orderst).subscribe(res =>{

        if(!res.error){
          this.orders  = res;
          // this.selectedorder = res[0]
          // this.status = this.selectedorder.status;
        }else{
          this.orders = [];
          this.selectedorder = [];
        }

        console.log(res)

       });
    }
  }


  onsortchange(){
    this.orders = [];

    this.orderService.getorderbystatus(this.sellerid,this.sortby).subscribe(res =>{

      if(!res.error){
        this.orders  = res;
        this.selectedorder = res[0]
        this.status = this.selectedorder.status;
      }else{
        this.orders = [];
        this.selectedorder = [];
      }

      console.log(res)

     });

  }


  showdetails(item){

  if(this.selectedorder?.id == item.id){
    this.selectedorder = null;
    this.status = '';
  }else{
    this.selectedorder = item;
    this.status = item.status;
  }

  }


  alerttoggle(){
    if(this.selectedorder !== null){
      this.status = null;
     }
    this.alert = !this.alert;
  }

  alerttoggle2(){
    if(this.selectedorder !== null){
      this.status = null;
     }
    this.alert2 = !this.alert2;
  }


  changeStatus(){

    if(this.selectedorder !== null){
      this.orderService.changeStatus(this.selectedorder.id,this.sellerid,this.status).subscribe(res => {
        var newo =  this.orders.find(i => i.id == this.selectedorder.id,);
        newo.status = this.status;
        this.selectedorder.status = this.status;
        this.alert = !this.alert;
     });
    }

  }

  schangeStatus(){

    if(this.sorder !== null){
      this.orderService.changeStatus(this.sorder.id,this.sellerid,this.status2).subscribe(res => {
        this.sorder.status = this.status2;
        this.alert2 = !this.alert2;
     });
    }

  }


  getorders(){
       this.orders = [];

       this.orderService.getSellerOrders(this.sellerid,this.page,"!2").subscribe(res =>{
         this.orders  = res;
        //  this.selectedorder = res[0]
        //  this.status = this.selectedorder.status;
         console.log(this.orders)
         if(this.orders.length === 0 || res.length < 10 ){
          this.noorder = true;
          this.stopscroll = true;
        }else{
          this.noorder = false;
          this.stopscroll = false;
        }
       });
  }



  hideorder(){
    this.sorder = null;
    this.notfound = false;
    this.sheader = false;
  }

  searchorder(){

    if(this.search !== null){

      this.selectedorder = null;
      this.notfound = false;
      this.sheader = false;
      this.sorder = null;
      this.status2 = '';

     this.orderService.searchorder(this.search,this.sellerid).subscribe(res =>{

      console.log("order res",res);
       if(res.length > 0){
        this.sheader = true;
        this.sorder = res[0];
        this.status2 = this.sorder.status;
        this.notfound = false;
       }else{
        this.sheader = true;
        this.notfound = true;
       }

     });
    }

  }


  msgtoggle(id = null){
    if(id !== null){
      this.msgsendid = id;
      this.alert3 = !this.alert3;
    }else{
      this.alert3 = false;
    }
  }






}
