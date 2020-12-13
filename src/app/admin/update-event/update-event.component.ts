import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../api.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.css']
})
export class UpdateEventComponent implements OnInit {

  public event = {};
  public locations = [];
  public categories = [];
  public event_id = '';
  public got_data: boolean = false;
  public msg: string = '';
  public is_error: boolean = false;

  constructor(private api: ApiService, private route: ActivatedRoute, private router: Router) {
    const params = route.snapshot.paramMap;
    this.event_id = params.get('id');

    this.get_event();
  }

  ngOnInit(): void {
  }

  get_event(){
    this.api.get_event_for_update(this.event_id).subscribe(res =>{
      this.event = res['event'];
      this.locations = res['locations'];
      this.categories = res['categories'];
      this.got_data = true;

      console.log(this.categories);
    })
  }

  update_event() {
    this.msg = '';
    if(!this.event['title']){
      this.msg = "Please enter title of the event";
      return;
    }
    if(!this.event['description']){
      this.msg = "Plase enter description of the event";
      return;
    }
    if(!this.event['date']){
      this.msg = "Please ente date for the event";
      return;
    }
    if(!this.event['location_id']){
      this.msg = "Please choose location of the event";
      return;
    }
    let post_data = {
      title: this.event['title'],
      description: this.event['description'],
      date: this.event['date'],
      location_id: this.event['location_id'],
      categories: this.categories
    }

    this.api.update_event(this.event_id, post_data).subscribe(res =>{
      if(res['success'] == 'Y') {
        this.msg = "Event is updated";
        this.is_error = false;
      }else{
        this.msg = res['msg'];
        this.is_error = true;
        return;
      }
    }, error => {
      this.is_error = true;
      this.msg = 'There is some problem. Please try again later';
      return;
    });
  }
}
