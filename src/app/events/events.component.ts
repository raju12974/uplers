import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  public events = [];
  public categories = [];
  public locations = [];

  public logged_in = false;
  public is_admin = false;

  public name = '';
  public date = '';
  public category_id = '';
  public location_id = '';

  constructor(private api: ApiService, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    if(this.auth.getAuthorizationToken()) {
      this.logged_in = true;
      if(localStorage.getItem('admin') == 'Y')
        this.is_admin = true;
    }else
      this.logged_in = false;
    this.get_events()
  }

  get_events(){
    let post_data = {
      name: this.name,
      date: this.date,
      category_id: this.category_id,
      location_id: this.location_id
    }
    this.api.get_events(post_data).subscribe(res => {
      this.events = res['events'];
      this.locations = res['locations'];
      this.categories = res['categories'];
    })
  }

  cat_names(event){
    return event['categories'].map(x => x.category_name).join(", ");
  }

  logout(){
    this.auth.logout();
    this.logged_in = false;
  }

  login(){
    this.router.navigate(['/login'], {
      queryParams: {
        return: this.router.url
      }
    });
  }
}
