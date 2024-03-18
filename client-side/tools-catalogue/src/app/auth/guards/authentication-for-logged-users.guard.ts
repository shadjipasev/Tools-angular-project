import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenicationForLoggedUsers  {
  constructor(private authService: AuthService,private router: Router) { }
  canActivate(): boolean {
    if (!this.authService.hasUser) {
      return true;
    } else {
      this.router.navigateByUrl('')
      console.warn('You are already logged in!')
      return false;
    }
  }
}
