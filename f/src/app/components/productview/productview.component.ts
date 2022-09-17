import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/_models/product';

@Component({
  selector: 'app-productview',
  templateUrl: './productview.component.html',
  styleUrls: ['./productview.component.css']
})
export class ProductviewComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  product: Product;

  ngOnInit(): void {

    this.route.data.subscribe(data => {
      this.product = data['product'];
      window.scrollTo(0, 0);
    })

  }

}
