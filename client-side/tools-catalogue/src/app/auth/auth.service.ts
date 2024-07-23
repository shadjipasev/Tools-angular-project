import { ShoppingCartService } from './../main/services/shopping-cart.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private cartService: ShoppingCartService
  ) {}

  public userId = new Subject<any>();

  public userRole = new Subject<any>();

  public tokenName: string = 'token';

  public hasUser: boolean = false;

  public admin: boolean = false;

  register(username: string, email: string, password: string) {
    return this.http.post<any>(`${apiUrl}/auth/register`, {
      username,
      email,
      password,
    });
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${apiUrl}/auth/login`, { username, password });
  }

  logout() {
    // const token = localStorage.getItem('token');
    localStorage.clear();
    this.isLogged();
    this.isAdmin();
    // return this.http.post<any>(`${apiUrl}/auth/logout`, { token });
  }

  isLogged() {
    const token = localStorage.getItem('token');
    if (token) {
      return (this.hasUser = true);
    } else {
      return (this.hasUser = false);
    }
  }

  isAdmin() {
    const role = localStorage.getItem('role');
    console.log(role);

    if (role === 'admin') {
      return (this.admin = true);
    } else {
      return (this.admin = false);
    }
  }

  getUserId() {
    const uId = localStorage.getItem('userId');
    return uId;
  }

  getUser(id: string) {
    return this.http.get<any>(`${apiUrl}/auth/profile/` + id);
  }
}
