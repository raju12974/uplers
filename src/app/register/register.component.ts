import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public name: string = '';
  public email: string = '';
  public password: string = '';

  private login_loading: boolean = false;
  private login_is_error: boolean;
  private return_url: string = '';
  public login_msg: string = '';

  constructor(private api: ApiService, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams
      .subscribe(params => {
          if(params['return']) {
            this.return_url = params['return']
          }
        }
      );
  }

  ngOnInit(): void {
  }

  register(){
    this.login_msg = '';

    if(!this.name){
      this.login_msg = "Please enter your name";
      return
    }
    if(!this.email){
      this.login_msg = "Please enter an email address";
      return
    }

    if(this.email){
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     let valid =  re.test(this.email.toLowerCase());

     if(!valid){
       this.login_msg = "Please enter a valid email address";
       return
     }
    }

    if(!this.password){
      this.login_msg = "Please enter password";
      return;
    }

    let post_data = {
      name: this.name,
      email: this.email,
      password: this.password
    }

    this.api.register(post_data).subscribe(res =>{
      this.login_loading = false;
      if(res['success'] == 'Y'){
        localStorage.setItem('token', res['access_token']);
        localStorage.setItem('admin', res['admin']);
        localStorage.setItem('user', JSON.stringify(res['user']))
        this.login_is_error = false;
        if(this.return_url){
          this.router.navigate([this.return_url]);
        }else{
          this.router.navigate(['/events']);
        }
        return;
      }else{
        this.login_is_error = true;
        this.login_msg = res['msg'];
      }
    }, error => {
      this.login_loading = false;
      this.login_is_error = true;
      this.login_msg = 'There is something wrong while signing up. Please try again after sometime.'
    })
  }

}
