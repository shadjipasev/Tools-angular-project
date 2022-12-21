import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  userId: any = localStorage.getItem('userId')
  user: any 

  ngOnInit(): void {
    this.authService.getUser(this.userId).subscribe(
      res => {
        this.user = res
      }
    )
  }

}
