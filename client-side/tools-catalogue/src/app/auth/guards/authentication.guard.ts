import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard  {
  constructor(private authService: AuthService, private router: Router) {}
  canActivate(): boolean {
    if (this.authService.hasUser) {
      return true;
    } else {
      console.warn('Only users with account can access this page!');
      this.router.navigateByUrl('auth/login');
      return false;
    }
  }
}
