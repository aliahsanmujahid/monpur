import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  params: any = {};

  constructor() { }

  ngOnInit(): void {
    this.params = "eeeeeeeeeee";
  }


  images = [
    {
      imageSrc:
          '../assets/banner1.jpg',
      imageAlt: 'nature1',
    },
    {
      imageSrc:
         '../assets/banner2.jpg',
      imageAlt: 'nature2',
    },
    {
      imageSrc:
          '../assets/banner3.jpg',
      imageAlt: 'person1',
    }
  ]
}
