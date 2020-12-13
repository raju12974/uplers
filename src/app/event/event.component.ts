import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  public event_id = '';
  public event = {};
  public got_data = false;
  public comment: string = '';

  constructor(private api:ApiService, private router:Router, private route: ActivatedRoute) {
    const params = route.snapshot.paramMap;
    this.event_id = params.get('id');
    this.get_event()
  }

  ngOnInit(): void {
  }

  get_event(){
    this.api.get_event(this.event_id).subscribe(res =>{
      this.event =res;
      this.got_data = true;
      console.log(this.event);
    })
  }

  add_comment(){
    let post_data = {
      text: this.comment
    }

    this.api.add_comment(this.event['id'], post_data).subscribe(res => {
      this.comment = '';
      console.log(res);
      this.event['comments'].push(res['comment']);
    });
  }

  cat_names(event){
    return event['categories'].map(x => x.category_name).join(", ");
  }
}
