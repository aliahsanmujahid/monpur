import { ReviewService } from './../../_services/review.service';
import { AccountService } from 'src/app/_services/account.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/_models/user';
import { OrderService } from 'src/app/_services/order.service';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { map } from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

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
  sellerid: number;
  customerid: number;
  status="All";
  progress: number = null;
  message: string = null;
  UserId: string;

  constructor(private route: ActivatedRoute,
    private accountService: AccountService,private http: HttpClient,
    private orderService: OrderService, private router: Router,
    private reviewService: ReviewService) { }

  ngOnInit(): void {
    this.UserId = this.accountService.getuserid()
    this.route.params.subscribe(params => {
      window.scrollTo(0, 0);
      this.stopscroll = false;
    });

    this.accountService.currentUser$.subscribe(res =>{

        //  console.log(res);
         if(res.role == "admin"){
          this.sellerid = res.userId;
          this.customerid = null;
          this.getorders();
         }
         if(res.role == "user"){
          this.sellerid = null;
          this.customerid = res.userId;
          this.getorders();
         }

    });
  }

  addreview(id){
    console.log(id);
    this.review.pid = id;
    this.isreview = true ;
  }
  createreview(){
    this.reviewService.createreview(this.review).subscribe( res=>{

      console.log(res);

    });

  }

  viewOrder(id:number){
    this.singleorder = [];
    this.singleorder = this.orders.filter(i => i.id == id);

    this.orderview = true;
    window.scrollTo(0, 0);
  }
  deleteOrder(id:number){
    this.orderService.deleteOrder(id).subscribe( res=>{
      this.orders.splice(this.orders.findIndex(m => m.id === id), 1);
    });

  }


  selectChange(){
    this.getOrdersByStatus(this.status);
  }
  getOrdersByStatus(status:string){
    this.orders = [];
    this.status = status;
    if(this.neworder){
      this.neworder = false;
    }
    this.getorders();
  }

  changeStatus(id:number,status:string){
   this.orderService.changeStatus(id,this.user.userId,status).subscribe(res => {
      var newo =  this.orders.find(i => i.id == id);
      newo.status = status;

   });

  }
  changecutomerstatus(id:number,status:string){
    this.orderService.changecutomerstatus(id,this.user.userId,status).subscribe(res => {
       var newo =  this.orders.find(i => i.id == id);
       newo.status = status;
    });

   }
  SearchOrder(){
    this.orders = [];
    this.noorder = false;
    this.orderview = false;
    this.stopscroll = false;
    this.orderService.getOrderById(this.search,this.sellerid).subscribe(res =>{
      this.orders.push(res);
      if(res == null){
        this.orders = null;
        this.noorder = true;
        this.stopscroll = true;
      }else{
        this.noorder = true;
        this.stopscroll = true;
      }
    });

  }


  getorders(){
    this.orders = [];
    this.page =1;
    this.orderview  = false;
    this.noorder = false;
    this.stopscroll = false;

    if(this.sellerid){
       this.orderService.getSellerOrders(this.sellerid,this.page,this.status).subscribe(res =>{
         this.orders  = res;
         console.log(res)
         if(this.orders.length === 0 || res.length < 10 ){
          this.noorder = true;
          this.stopscroll = true;
        }else{
          this.noorder = false;
          this.stopscroll = false;
        }
       });
    }
    if(this.customerid){

       this.orderService.getCustomerOrders(this.customerid,this.page,this.status,this.neworder).subscribe(res =>{
         this.orders  = res;
         this.neworder = false;
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


    this.http.post('http://localhost:8000/api/user/imageupload', formData, {reportProgress: true, observe: 'events'})
    .pipe(
      map((data: any) => {
        if (data.type === HttpEventType.UploadProgress)
        this.progress = Math.round(100 * data.loaded / data.total);
        else if (data.type === HttpEventType.Response) {
        this.message = 'Upload success.';


        if(val == 1){
          this.review.image1 = data.body.imagePath
        }
        if(val == 2){
          this.review.image2 = data.body.imagePath
        }
        if(val == 3){
          this.review.image3 = data.body.imagePath
        }
        if(val == 4){
          this.review.image4 = data.body.imagePath
        }


      }})).subscribe();
  }


  onScroll(): void {
    if(this.orderview == false && this.stopscroll == false){
      this.noorder = false;

      if(this.sellerid){
        this.orderService.getSellerOrders(this.sellerid,++this.page,this.status).subscribe( res => {
          this.orders.push(...res);
          if(res.length === 0 || res.length < 10 ){
            this.noorder = true;
            this.stopscroll = true;
          }else{
            this.noorder = false;
            this.stopscroll = false;
          }

         });
      }
      if(this.customerid){
        this.orderService.getCustomerOrders(this.customerid,++this.page,this.status,this.neworder).subscribe( res => {

          this.orders.push(...res);
          if(res.length === 0 || res.length < 10 ){
            this.noorder = true;
            this.stopscroll = true;
          }else{
            this.noorder = false;
            this.stopscroll = false;
          }

         });
      }
    }
    }

    deleteimage = async(path,val) =>{
      this.message = "Deleteing";
      this.progress = null;
      this.http.post('http://localhost:8000/api/user/deleteimage', {imagePath:path})
      .pipe(
        map((data: any) => {
          this.message = "Deleted";
            if(val == 1){
              this.review.image1 = ''
            }
            if(val == 2){
              this.review.image2 = ''
            }
            if(val == 3){
              this.review.image3 = ''
            }
            if(val == 4){
              this.review.image4 = ''
            }

        })
      ).subscribe();
     }


}
