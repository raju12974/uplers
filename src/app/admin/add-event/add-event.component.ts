import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../api.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  public title = '';
  public desc = '';
  public date = '';

  public categories = [];
  public locations = [];

  public location_id = '';
  public error='';

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit(): void {
    this.api.get_locations().subscribe(res =>{
      this.locations =res['locations'];
    })
    this.api.get_categories().subscribe(res => {
      this.categories = res['categories'];
    })
  }

  add_event(){
    this.error = '';
    if(!this.title){
      this.error = "Please enter title of the event";
      return;
    }
    if(!this.desc){
      this.error = "Plase enter description of the event";
      return;
    }
    if(!this.date){
      this.error = "Please ente date for the event";
      return;
    }
    if(!this.location_id){
      this.error = "Please choose location of the event";
      return;
    }
    let post_data = {
      title: this.title,
      description: this.desc,
      date: this.date,
      location_id: this.location_id,
      categories: this.categories
    }

    this.api.add_event(post_data).subscribe(res =>{
      if(res['success'] == 'Y')
        this.router.navigate(['/events']);
      else{
        this.error = res['msg'];
        return;
      }
    }, error => {
      this.error = 'There is some problem. Please try again later';
      return;
    });
  }

}
