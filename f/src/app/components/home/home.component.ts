import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/_services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  showhide = false;
  showbanner = false;

  params: any = {};
  category: any = [];
  scate: any = [];
  catename = '';
  cateid = 0;
  catelength = 0;



  constructor(public categoryService: CategoryService) { }

  ngOnInit(): void {
    this.params = "eeeeeeeeeee";
    this.getCategoryes();
  }

  over(item){
    this.showhide = true;
    this.cateid = item.id;
    this.catename = item.name;
    this.scate = item.subcate;
    console.log("Mouseover called");
  }

  out(){
    this.showhide = false;
    console.log("Mouseout called");
  }

  over2(){
    this.cateid = this.cateid;
    this.catename =  this.catename ;
    this.showhide = true;
    window.scrollTo(0, 0);
  }

  out2(){
    this.showhide = false;
  }

  getCategoryes(){

    this.categoryService.getcategoryes().subscribe( res => {
      this.category = res;
      this.showbanner = true;
      // this.scate = this.category[0].subcate;
      this.catelength = this.category.length;
      console.log("this.category.length",this.category.length);
    })
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
