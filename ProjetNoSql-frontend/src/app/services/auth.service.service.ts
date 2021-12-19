import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";
import {User} from '../models/users.model'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: User;
  constructor(private http: HttpClient) { }

  registerUser(user: User){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<User>('http://localhost:3000/users/register',user, {headers: headers})
        .pipe(map( (res:any) => res))
  }

  authenticateUser(user: any) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post<User>('http://localhost:3000/users/authenticate',user, {headers: headers})
        .pipe(map( (res:any) => res))
  }

 /* getProfile() {
    let headers = new HttpHeaders();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get<User>('http://localhost:3000/users/profile', {headers: headers})
        .pipe(map( (res:User) => res))
  }*/

  storeUserData(token: any, user: User) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn() {
    return this.authToken ? true : false;//ternary operator
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
