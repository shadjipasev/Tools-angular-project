import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ShoppingCartService } from '../services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private cartService: ShoppingCartService
  ) {}

  ngOnInit(): void {
    this.cartService.cartSubject.next(this.cartService.getCartSize());
    this.authService.userId.next(localStorage.getItem('userId'));
  }
}
