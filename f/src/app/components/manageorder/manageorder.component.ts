import { environment } from 'src/environments/environment';
import { ReviewService } from './../../_services/review.service';
import { AccountService } from 'src/app/_services/account.service';
import { Component, OnInit } from '@angular/core';
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
  imglink = environment.imgUrl;

  user: User;
  noorder = false;
  throttle = 0;
  distance = 1;
  page:number = 1;
  orderview  = false;
  stopscroll  = false;
  search:string;
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
  singleorder: any = [];
  selectedorder: any = null;
  sellerid: number;
  customerid: number;
  progress: number = null;
  message: string = null;
  alert = false;

  status = '';
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
  this.selectedorder = item;
  this.status = item.status;
  console.log(item.status)
  }
  alerttoggle(){
    this.alert = !this.alert;
  }



  changeStatus(){
   this.orderService.changeStatus(this.selectedorder.id,this.sellerid,this.status).subscribe(res => {
      var newo =  this.orders.find(i => i.id == this.selectedorder.id,);
      newo.status = this.status;
   });

  }


  getorders(){
       this.orders = [];

       this.orderService.getSellerOrders(this.sellerid,this.page,"!2").subscribe(res =>{
         this.orders  = res;
         this.selectedorder = res[0]
         this.status = this.selectedorder.status;
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







}
