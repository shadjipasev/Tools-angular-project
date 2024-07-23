import { ShoppingCartService } from './../services/shopping-cart/shopping-cart.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoaderService } from '../services/loader/loader.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
})
export class ShoppingCartComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cartServices: ShoppingCartService,
    private loader: LoaderService
  ) {}

  tools: any;
  totalPrice: number = 0;
  // qty: number =

  ngOnInit(): void {
    // console.log('ngWorks');
    this.cartServices.loadCart();
    this.cartServices.getProduct();
    this.getTotalPrice();
    console.log(this.tools);
  }

  onChangeQty(change: any, tool: any) {
    let itemQuantity = Number(change.value);
    // let itemPrice = tool.price.toFixed(2);

    // let currentProductPrice = 0;

    // currentProductPrice = itemQuantity * Number(itemPrice);
    // console.log(currentProductPrice + '==== currentProductPrice');

    // console.log('itemQuantity === ' + itemQuantity);
    // console.log('itemPrice === ' + itemPrice);

    let currentItemIndex = this.tools.map((e: any) => e._id).indexOf(tool._id);
    this.tools[currentItemIndex].quantity = itemQuantity;
    this.cartServices.saveCartChanges(this.tools);
    // console.log(
    //   this.totalPrice + '==== totalPrice before add currentProductPrice'
    // );

    this.getTotalPrice();
    // this.totalPrice += currentProductPrice;

    // this.totalPrice = Number(this.totalPrice.toFixed(2));
  }

  getTotalPrice() {
    this.loader.hideLoader();
    this.tools = this.cartServices.getProduct();
    let priceToBe = 0;
    for (let p of this.tools) {
      let price = Number(p.price.toFixed(2));
      let qty = Number(p.quantity.toFixed(2));
      console.log(price);
      console.log(qty);

      priceToBe += price * qty;

      // console.log(this.totalPrice + 'this.totalPrice after calc');

      // console.log(p.quantity + '   typeof quantity');
    }

    this.totalPrice = Number(priceToBe.toFixed(2));
  }

  RemoveItem(tool: any) {
    this.cartServices.removeProduct(tool);
    this.getTotalPrice();
  }

  onSubmitOrder() {
    // this.cartServices.clearProducts();
    // this.cartServices.saveCartChanges('');
    // localStorage.removeItem('cart_items');
    this.cartServices.clearProducts();
    this.router.navigate(['/order-submited']);
  }

  ngOnDestroy(): void {
    this.cartServices.saveCart();
  }
}
