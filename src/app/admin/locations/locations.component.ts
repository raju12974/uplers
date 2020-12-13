import { Component, OnInit } from '@angular/core';
import {ApiService} from '../../api.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {
  public locations = [];
  public location_name = '';
  public got_data: boolean = false;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.get_locations().subscribe(res => {
      this.locations = res['locations'];
      this.got_data = true;
    }, error => {
      this.got_data = true;
    })

  }

  add_location(){
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
      this.locations.splice(i,1);
    })
  }


}
