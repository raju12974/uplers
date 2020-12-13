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

  get_categories(){
    return this.http.get(this.singleton.root_url+'api/get/categories');
  }

  add_category(post_data){
    return this.http.post(this.singleton.root_url+'api/add/category', post_data);
  }

  delete_category(id){
    return this.http.get(this.singleton.root_url+'api/delete/category/'+id)
  }

  get_locations(){
    return this.http.get(this.singleton.root_url+'api/get/locations');
  }

  add_locaiton(post_data){
    return this.http.post(this.singleton.root_url+'api/add/location', post_data);
  }

  delete_location(id){
    return this.http.get(this.singleton.root_url+'api/delete/location/'+id)
  }

  add_event(post_data){
    return this.http.post(this.singleton.root_url+'api/add/event', post_data);
  }

  get_events(post_data){
    return this.http.post(this.singleton.root_url+'api/get/events', post_data);
  }

  get_event(id){
    return this.http.get(this.singleton.root_url+'api/get/event/'+id)
  }

  add_comment(id, post_data){
    return this.http.post(this.singleton.root_url+'api/add/comment/'+id, post_data);
  }

  get_event_for_update(id){
    return this.http.get(this.singleton.root_url+'api/get/event/update/'+id)
  }

  update_event(id, post_data){
    return this.http.post(this.singleton.root_url+'api/update/event/'+id, post_data);
  }

  update_category(id, post_data){
    return this.http.post(this.singleton.root_url+'api/update/category/'+id, post_data)
  }

  update_location(id, post_data){
    return this.http.post(this.singleton.root_url+'api/update/location/'+id, post_data)
  }
}
