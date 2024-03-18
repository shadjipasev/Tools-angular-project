import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionGuard  {
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
