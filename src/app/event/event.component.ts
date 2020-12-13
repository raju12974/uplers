import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../auth.service';

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
  logged_in: boolean = false;

  constructor(private api:ApiService, private router:Router, private route: ActivatedRoute, private auth: AuthService) {
    const params = route.snapshot.paramMap;
    this.event_id = params.get('id');
    this.get_event();

    if(this.auth.getAuthorizationToken()) {
      this.logged_in = true;
    }else
      this.logged_in = false;
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
      this.event['comments'].splice(0, 0, res['comment']);
    });
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
