import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/_services/category.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  imglink = environment.imgUrl;

  search:'';
  searchkeys: any[] = [];
  category: any = [];

  constructor(public categoryService: CategoryService,private router: Router) { }

  ngOnInit(): void {

    this.getmixedcates();

    let keys: string[] = JSON.parse(localStorage.getItem("searchkeys"));

    if(keys){
      keys.reverse().forEach( (value,index) =>{
            if(index < 10){
              this.searchkeys.push(value);
            }else{
              return;
            }
      });
      localStorage.setItem("searchkeys", JSON.stringify(this.searchkeys));
    }

  }

  deletekey(item){
    this.searchkeys.forEach((element,index)=>{
      if(element==item){
        this.searchkeys.splice(index,1);
        localStorage.setItem("searchkeys", JSON.stringify(this.searchkeys));
      };

   });
    console.log(this.searchkeys)
  }
  searchkry(key){
    this.router.navigate(['shop', { 'search':key }]);
  }

  getmixedcates(){

    this.categoryService.getmixedcates().subscribe( res => {
      this.category = res;
      console.log("mixed",res);
    })
   }

  searchProduct(){

    let keys: string[] = JSON.parse(localStorage.getItem("searchkeys"));

    // console.log("key: -- ",keys);

    if(keys){
      keys.push(this.search);
      localStorage.setItem("searchkeys", JSON.stringify(keys));
    }else{
      localStorage.setItem("searchkeys", JSON.stringify([this.search]));
    }


    if(this.search != ''){
      // console.log("search: -- ",this.search);
      this.router.navigate(['shop', { 'search':this.search }]);
    }
  }

}
