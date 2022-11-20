import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  noaddress = false;
  changenam = false;
  createaddress: any = {
    district:'None',
    upazila:'None'
  };
  name: any = {
    name:''
  };
  useraddress:any = [];
  districts: any = [];
  upazilla: any = [];
  userId:number = null;
  model ={
    username: '',
    email: '',
    image:''
  };

  constructor(public accountService: AccountService,public router: Router) { }

  ngOnInit(): void {

      this.accountService.currentUser$.subscribe( user => {
        if(user){
          console.log(user)
        }
      });


  }




  ondisChange(){

      const selected = this.districts.find(m => m.name === this.createaddress.district);

      this.createaddress.upazila = "None";

      this.createaddress.districtId = selected ? selected.id : 0;

      this.upazilla = selected ? selected.subDto : [];
  }
  onupaChange(){
      const selected = this.upazilla.find(m => m.name === this.createaddress.upazila);
      this.createaddress.upazilaId =  selected ? selected.id : 0;
  }
  seeaddress(){
    if(this.useraddress !== null){
      this.createaddress=this.useraddress;
    }
    this.noaddress = !this.noaddress;
  }
  changename(){
       this.changenam = !this.changenam;
  }

  setAddress(){
    this.accountService.createaddress(this.createaddress).subscribe(res=>{
        localStorage.setItem('address'+this.userId , JSON.stringify(res));
        this.useraddress = res;
        this.noaddress = !this.noaddress;
    });
  }
  setName(){




  }

  getaddress(){
     this.useraddress = [];
     const address = JSON.parse(localStorage.getItem('address'+this.userId));
     if(address){
      this.useraddress = address;
     }else{
      if(this.userId != null){
        this.accountService.getaddress().subscribe(res =>{
          this.useraddress = res;
          localStorage.setItem('address'+this.userId , JSON.stringify(res));
       });
      }
     }
  }

}
