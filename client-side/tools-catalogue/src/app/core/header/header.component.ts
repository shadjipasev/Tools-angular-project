import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, public authService: AuthService) { }

  userId: any;

  ngOnInit(): void {
    this.authService.isLogged()
    this.authService.isAdmin()
    this.userId = localStorage.getItem('userId')
  }

  onLogout(): void {
    this.authService.logout().subscribe(res=> {
      console.log(res)
    })
    this.router.navigate(['/'])
  }



  
}
