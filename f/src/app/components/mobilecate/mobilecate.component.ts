import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/_services/category.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-mobilecate',
  templateUrl: './mobilecate.component.html',
  styleUrls: ['./mobilecate.component.css']
})
export class MobilecateComponent implements OnInit {

  constructor(public categoryService: CategoryService) { }

  imglink = environment.imgUrl;

  category: any = [];
  scate: any = [];
  nocate:  any = [];

  ngOnInit(): void {
    this.getCategoryes();
  }

  selectcate(item){
    this.nocate = item
    this.scate = item.subcate;
  }

  getCategoryes(){

    this.categoryService.getcategoryes().subscribe( res => {
      this.category = res;
      this.scate = this.category[0].subcate;
      console.log(this.category);
    })
}

}
