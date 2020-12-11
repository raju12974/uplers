import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email: string = '';
  public password: string = '';

  constructor(private api: ApiService) { }

  ngOnInit(): void {
  }

  login(){
    let post_data = {email: this.email, password: this.password};

    this.api.login(post_data).subscribe(res =>{
      console.log(res);
    })
  }

}
