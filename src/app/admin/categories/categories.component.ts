import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../api.service';
import {Router} from '@angular/router';
import {AuthService} from '../../auth.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  public categories = [];
  public category_name = '';
  public got_data: boolean = false;

  constructor(private api: ApiService, private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
    this.api.get_categories().subscribe(res => {
      this.categories = res['categories'];
      this.got_data = true;
    }, error => {
      this.got_data = true;
    })

  }

  add_category(){
    if(!this.category_name){
      return;
    }
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

  update_category(category){
    if(!category['temp_name']){
      return;
    }
    let post_data = {name: category['temp_name']}

    this.api.update_category(category['id'], post_data).subscribe(res =>{
      if(res['success'] =='Y'){
        category['category_name'] = category['temp_name'];
        category['temp_name'] = '';
      }
    })
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['/login'])
  }
}
