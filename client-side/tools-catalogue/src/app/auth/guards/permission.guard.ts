import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router){}
  canActivate(){
    if(this.authService.isAdmin()){
      return true;
    }else{
      console.warn('Only admins can access this routes!');
      this.router.navigateByUrl('')
      return false;
    }
  }
  
}
