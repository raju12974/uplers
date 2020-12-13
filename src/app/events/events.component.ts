import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  public events = [];

  public logged_in = false;
  public is_admin = false;

  constructor(private api: ApiService, private auth: AuthService) { }

  ngOnInit(): void {
    if(this.auth.getAuthorizationToken()) {
      this.logged_in = true;
      if(localStorage.getItem('admin') == 'Y')
        this.is_admin = true;
    }else
      this.logged_in = false;
    this.get_events()
  }

  get_events(page=1){
    this.api.get_events(1).subscribe(res => {
      this.events = res['data'];
    })
  }

  cat_names(event){
    return event['categories'].map(x => x.category_name).join(", ");
  }

}
