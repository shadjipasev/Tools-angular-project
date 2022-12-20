import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl


@Injectable({
  providedIn: 'root'
})


export class AuthService {

  constructor(private http: HttpClient) { }

  public tokenName: string = 'token'

  public hasUser: boolean = false

  public admin: boolean = false

  register(username: string, email: string, password: string) {
    return this.http.post<any>(`${apiUrl}/auth/register`, { username, email, password })
  }

  login(username: string, password: string,) {
    return this.http.post<any>(`${apiUrl}/auth/login`, { username, password })
  }

  logout() {
    const token = localStorage.getItem('token')
    localStorage.clear();
    this.isLogged();
    this.isAdmin();
    return this.http.post<any>(`${apiUrl}/auth/logout`, { token })
  }

  isLogged() {
    const token = localStorage.getItem('token')
    if (token) {
      this.hasUser = true
    } else {
      this.hasUser = false
    }
  }

  isAdmin(){
    const role = localStorage.getItem('role')
    if(role === 'admin'){
      this.admin = true
    }
  }

  getUser(){
    
  }
}
