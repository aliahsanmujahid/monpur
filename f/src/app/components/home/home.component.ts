import { BusyService } from './../../_interceptors/busy.service';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/_services/category.service';
import { environment } from 'src/environments/environment';
import { ProductService } from 'src/app/_services/product.service';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  imglink = environment.imgUrl;

  showhide = false;
  showbanner = false;

  params: any = {};
  category: any = [];
  allcategory: any = [];
  scate: any = [];
  catename = '';
  cateid = 0;
  catelength = 0;



  constructor(public categoryService: CategoryService,public productService: ProductService,
    public busyService: BusyService) { }

  ngOnInit(): void {
    this.params = "eeeeeeeeeee";
    this.getCategoryes();
    this.getmixedcates();
  }

  getmixedcates(){
    this.busyService.busy();
    this.categoryService.getmixedcates().subscribe( res => {
      this.allcategory = res;
      this.busyService.idle();
    })
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
    this.busyService.busy();

    this.categoryService.getcategoryes().subscribe( res => {
      this.category = res;
      this.showbanner = true;
      this.busyService.idle();
      // this.scate = this.category[0].subcate;

      this.catelength = this.category.length;
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

  customOptions: OwlOptions = {
    // autoplay:true,
    // autoplayTimeout:2000,
    // autoplayHoverPause:true,
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 300,
    navText: ['<i class="fa fa-angle-left" aria-hidden="true"></i>',
     '<i class="fa fa-angle-right" aria-hidden="true"></i>'],
    responsive: {
      0: {
        items: 3
      },
      400: {
        items: 3
      },
      740: {
        items: 5
      },
      940: {
        items: 8
      }
    },
    nav: true
  }

}
