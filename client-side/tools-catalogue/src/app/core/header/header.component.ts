import { LoaderService } from './../../main/services/loader/loader.service';
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
  itemIsInCart: boolean;
  userRole: string;

  constructor(
    private router: Router,
    public authService: AuthService,
    private cartService: ShoppingCartService,
    private toolService: ToolService,
    private loaderService: LoaderService
  ) {
    this.cartService.cartSubject.subscribe((data) => {
      console.log(data + ' check data');
      this.cartItems = data;
    });
    this.authService.userId.subscribe((data) => {
      console.log(data + '->>>> userId');
      this.userId = data;
    });
    this.cartService.allReadyInCart.subscribe((data) => {
      this.itemIsInCart = data;
    });
    this.authService.isLogged();

    this.authService.isAdmin();
  }

  // form: FormGroup

  ngOnInit(): void {
    //  = this.authService.userId(localStorage.getItem(""));
    this.authService.userId.next(localStorage.getItem('userId'));
    this.authService.userId.subscribe((data) => {
      console.log(data + '->>>> userId');
      this.userId = data;
    });

    this.cartService.cartSubject.next(this.cartService.getCartSize());
    this.cartService.cartSubject.subscribe((data) => {
      console.log(data + ' check data');
      this.cartItems = data;
    });

    this.authService.userRole.next(localStorage.getItem('role'));
    this.authService.userRole.subscribe((data) => {
      // console.log(data + ' check data');
      this.userRole = data;
    });
    // this.cartItems = this.cartService.getCartSize();
    this.authService.isLogged();

    this.authService.isAdmin();
  }

  onLogout(): void {
    this.authService.logout();
    this.cartService.clearProducts();
    this.loaderService.hideLoader();
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

  hideNotification() {
    this.itemIsInCart = false;
  }
}
