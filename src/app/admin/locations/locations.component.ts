import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../api.service';
import {AuthService} from '../../auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {
  public locations = [];
  public location_name = '';
  public got_data: boolean = false;

  constructor(private api: ApiService, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.api.get_locations().subscribe(res => {
      this.locations = res['locations'];
      this.got_data = true;
    }, error => {
      this.got_data = true;
    })

  }

  add_location(){
    if(!this.location_name){
      return;
    }
    let post_data = {name: this.location_name};

    this.api.add_locaiton(post_data).subscribe(res =>{
      this.locations.push(res['location']);
      this.location_name = '';
    }, error => {

    })
  }

  delete_location(i){
    let cat_id = this.locations[i]['id'];

    this.api.delete_location(cat_id).subscribe(res =>{
      if(res['success'] == 'Y'){
        this.locations.splice(i,1);
      }else{
        alert(res['msg']);
      }
    })
  }

  update_location(location){
    if(!location['temp_name']){
      return;
    }
    let post_data = {name: location['temp_name']}

    this.api.update_location(location['id'], post_data).subscribe(res =>{
      if(res['success'] =='Y'){
        location['name'] = location['temp_name'];
        location['temp_name'] = '';
      }
    })
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['/login'])
  }
}
