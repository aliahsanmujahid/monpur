import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

interface carouselImage{
  imageSrc: string;
  imageAlt: string;
}

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {

  @Input() images: carouselImage[] = [];
  @Input() indicators = true;
  @Input() controls = false;
  @Input() pcontrols = false;
  @Input() autoSlide = false;
  @Input() content = false;
  @Input() slideInterval = 3000;

  selectedIndex  = 0;
  imglink = environment.imgUrl;

  constructor() { }

  ngOnInit(): void {
    if(this.autoSlide){
      this.autoSlideImage();
    }
  }

  autoSlideImage(){
    setInterval(() => {
      this.onNextClick();
    },this.slideInterval);
  }

  selectImage(i){
    this.selectedIndex = i;
  }
  onPrevClick(){
    if(this.selectedIndex === 0){
       this.selectedIndex = this.images.length -1;
    }else{
      this.selectedIndex--;
    }
  }
  onNextClick(){
    if(this.selectedIndex === this.images.length -1){
      this.selectedIndex = 0;
   }else{
     this.selectedIndex++;
   }
  }


}
