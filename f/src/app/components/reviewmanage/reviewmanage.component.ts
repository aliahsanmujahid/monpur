import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reviewmanage',
  templateUrl: './reviewmanage.component.html',
  styleUrls: ['./reviewmanage.component.css']
})
export class ReviewmanageComponent implements OnInit {

  constructor() { }

  alert = false;
  status = '';
  setstatus = [
    {
      id:1,
      name: 'Pending',
    },
    {
      id:2,
      name: 'Approve',
    },
    {
      id:3,
      name: 'Reject',
    }

  ]

  ngOnInit(): void {
  }


  alerttoggle(){
    this.alert = !this.alert;
  }

}
