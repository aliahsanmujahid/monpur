import { OrderService } from './../../_services/order.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.css']
})
export class PrintComponent implements OnInit {

  constructor(private orderService: OrderService,private route: ActivatedRoute,private router: Router) { }

  order: any = null;

  ngOnInit(): void {

    this.route.params.subscribe(p => {
      if(p['id'] != undefined && p['id'] != null){
        console.log(p['id']);

        this.orderService.getOrderById(p['id']).subscribe(res =>{
          if(res.error){
            this.router.navigateByUrl("/");
          }
          this.order = res;

          console.log( " this.order ",this.order )
        });
      }

    });
  }

}
