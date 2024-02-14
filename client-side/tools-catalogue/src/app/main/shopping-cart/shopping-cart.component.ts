import { ShoppingCartService } from './../services/shopping-cart/shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private cartServices: ShoppingCartService
  ) {}

  tools: any;
  totalPrice: number = 0;
  qty: number = 1;

  ngOnInit(): void {
    console.log('ngWorks');
    this.cartServices.loadCart();
    this.tools = this.cartServices.getProduct();
    this.getTotalPrice();
    console.log(this.tools);
  }

  onChangeQty(product: any, item: any) {
    // item.quantity = product.qty;
    // this.cartServices.saveCart();
  }

  getTotalPrice() {
    for (let p of this.tools) {
      console.log(typeof p.price + 'typeof price');

      this.totalPrice += parseInt(p.price) * parseInt(p.quantity);

      console.log(typeof p.price + 'typeof price');
      console.log(typeof p.quantity + 'typeof quantity');
    }
  }

  RemoveItem(tool: any) {
    this.cartServices.removeProduct(tool);
  }
}
