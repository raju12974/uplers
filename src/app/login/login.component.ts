import { Component, OnInit } from '@angular/core';
import {ApiService} from '../api.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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

  login(){
    this.login_msg = '';

    if(!this.email){
      this.login_msg = "Please enter a valid email address";
      return
    }

    if(!this.password){
      this.login_msg = "Please enter password";
      return;
    }

    let post_data = {email: this.email, password: this.password};

    this.api.login(post_data).subscribe(res =>{
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
      }else if(res['email_exist'] == 'N'){
        this.login_is_error = true;
        this.login_msg = 'Email address does not exist';
      }else if(res['invalid'] == 'Y'){
        this.login_is_error = true;
        this.login_msg = 'Invalid credentials';
      }
    }, error => {
      this.login_loading = false;
      this.login_is_error = true;
      this.login_msg = 'There is something wrong while signing up. Please try again after sometime.'
    })
  }

}
