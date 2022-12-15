import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const apiUrl = environment.apiUrl


@Injectable({
  providedIn: 'root'
})


export class AuthService {

  constructor(private http: HttpClient) { }


  register(username: string, email: string, password: string) {
    return this.http.post<any>(`${apiUrl}/auth/register`, { username, email, password })
  }

  login(username: string, password: string,) {
    return this.http.post<any>(`${apiUrl}/auth/login`, { username, password })
  }
}
