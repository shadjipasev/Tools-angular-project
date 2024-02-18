import { ShoppingCartService } from './../services/shopping-cart/shopping-cart.service';
import { AuthService } from './../../auth/auth.service';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToolService } from '../services/tool/tool.service';
// import { ITool } from 'src/app/shared/interfaces/Tool';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  tool: any;
  toolId: string = '';
  admin: any;
  userId: any;

  constructor(
    private toolService: ToolService,
    private route: ActivatedRoute,
    private auth: AuthService,
    public cartService: ShoppingCartService
  ) {
    // this.cartService
    //   .getCartSize()
    //   .subscribe((size) => (this.cartSize = size.data));
  }

  ngOnInit(): void {
    if (this.auth.isAdmin()) {
      this.admin = true;
    }

    // this.cartService.getCartSize();
    this.cartService.cartSubject.next(this.cartService.getCartSize());
    this.userId = this.auth.getUserId();
    this.toolId = this.route.snapshot.params['id'];
    this.toolService.getById(this.toolId).subscribe((res) => {
      this.tool = res;
      console.log(this.tool), (error: any) => console.log(error);
    });
  }

  addTool(product: any) {
    console.log('addTool Works');

    if (!this.cartService.productInCart(product)) {
      product.quantity = 1;
      this.cartService.addToCart(product);
      // this.cartService.loadCart();
      this.cartService.cartSubject.next(this.cartService.getCartSize());
    }
  }

  cartSize: any;
  // cartSizeFunc() {
  //   this.cartService.getCartSize().subscribe({
  //     next: (res) => {
  //       if (res) {
  //         this.cartSize = res.data;
  //         console.log(res.message);
  //       }
  //     },
  //   });
  //   this.cartService.cartSubject.next(this.cartSize);
  //   console.log(this.cartSize + ' is the cartSize');
  // }
}
