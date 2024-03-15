import { ToolService } from './../../main/services/tool/tool.service';
import { ShoppingCartService } from './../../main/services/shopping-cart/shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  userId: any;
  cartItems: number = 0;
  tools: any;
  search: string;
  constructor(
    private router: Router,
    public authService: AuthService,
    private cartService: ShoppingCartService,
    private toolService: ToolService
  ) {
    this.cartService.cartSubject.subscribe((data) => {
      console.log(data + ' check data');
      this.cartItems = data;
    });
  }

  // form: FormGroup

  ngOnInit(): void {
    this.cartService.cartSubject.next(this.cartService.getCartSize());
    this.cartService.cartSubject.subscribe((data) => {
      console.log(data + ' check data');
      this.cartItems = data;
    });
    // this.cartItems = this.cartService.getCartSize();
    this.authService.isLogged();

    this.authService.isAdmin();
    this.userId = localStorage.getItem('userId');
  }

  onLogout(): void {
    this.authService.logout().subscribe((res) => {
      console.log(res);
      this.cartService.clearProducts();
    });
    this.router.navigate(['/']);
  }

  onKey(value: string): void {
    console.log('Input value changed:', value);
    if (value == '') {
      return;
    }

    this.toolService.searchToolByName(value).subscribe((res) => {
      this.tools = res;
    });
  }

  clearSearchInput(): void {
    this.search = '';
  }
}
