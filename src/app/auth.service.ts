import { Injectable } from '@angular/core';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router) { }

  getAuthorizationToken() {
    return localStorage.getItem('token');
  }

  setAuthorizationToken(token) {
    localStorage.setItem('token',token);
  }

  logout() {
    // localStorage.removeItem('token');
    localStorage.clear();
    // this.router.navigate([''], {replaceUrl: true}); return;
  }
}
