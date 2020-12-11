import { Injectable } from '@angular/core';
import {SingletonService} from './singleton';
import {HandleError, HttpErrorHandler} from './http-error-handler.service';
import {SharedService} from './shared-service';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private handleError: HandleError;

  constructor(private http: HttpClient,
              private singleton: SingletonService,
              private auth:AuthService,
              private shared_service:SharedService,
              httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('HeroesService');
  }

  login(post_data){
    return this.http.post(this.singleton.root_url+'api/login', post_data);
  }

  register(post_data){
    return this.http.post(this.singleton.root_url+'api/register', post_data);
  }
}
