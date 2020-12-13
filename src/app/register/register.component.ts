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
