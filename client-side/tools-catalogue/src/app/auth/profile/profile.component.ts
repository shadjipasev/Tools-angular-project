import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  userId: any = '';
  user: any;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.userId = localStorage.getItem('userId');
    this.authService.getUser(this.userId).subscribe((res) => {
      // console.log(this.userId);
      this.user = res;
    });
  }
}
