import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../api.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  public categories = [];
  public category_name = '';
  public got_data: boolean = false;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.get_categories().subscribe(res => {
      this.categories = res['categories'];
      this.got_data = true;
    }, error => {
      this.got_data = true;
    })

  }

  add_category(){
    let post_data = {name: this.category_name};

    this.api.add_category(post_data).subscribe(res =>{
      this.categories.push(res['category']);
      this.category_name = '';
    }, error => {

    })
  }

  delete_category(i){
    let cat_id = this.categories[i]['id'];

    this.api.delete_category(cat_id).subscribe(res =>{
      this.categories.splice(i,1);
    })
  }

}
