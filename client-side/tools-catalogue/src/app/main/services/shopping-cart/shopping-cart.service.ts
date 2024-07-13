import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ITool } from 'src/app/shared/interfaces/Tool';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ICart } from 'src/app/shared/interfaces/Cart';

@Injectable({
  providedIn: 'root',
})
export class ShoppingCartService {
  cartSubject = new Subject<any>();
  allReadyInCart = new Subject<boolean>();
  private apiUrl = environment.apiUrl;
  tools: ITool[] = [];
  products: any[] = [];
  constructor(private http: HttpClient) {}

  getProduct() {
    return this.products;
  }

  saveCart() {
    localStorage.setItem('cart_items', JSON.stringify(this.products));
    this.cartSubject.next(this.getCartSize());
  }

  saveCartChanges(cartItems: any) {
    this.products = cartItems;
    this.saveCart();
  }

  addToCart(addedProduct: any) {
    if (!this.productInCart(addedProduct)) {
      addedProduct.quantity = 1;
      this.products.push(addedProduct);
      this.saveCart();
    }
    //add logic for notification if product is added
    return;
  }

  loadCart() {
    this.products = JSON.parse(localStorage.getItem('cart_items') as any) || [];
  }

  getCartSize() {
    let cart = JSON.parse(localStorage.getItem('cart_items') as any) || [];
    return cart.length;
  }

  productInCart(product: any) {
    return this.products.findIndex((x: any) => x._id === product._id) > -1;
  }

  removeProduct(product: any) {
    const index = this.products.findIndex((x: any) => x._id === product._id);

    if (index > -1) {
      this.products.splice(index, 1);
      this.saveCart();
    }
    this.cartSubject.next(this.getCartSize());
  }

  clearProducts() {
    localStorage.setItem('cart_items', '');
  }

  // getCart() {
  //   return this.http.get<any>(`${this.apiUrl}/cart/get`);
  // }

  // setSize(cartSize: any) {
  //   this.cartSize.next(cartSize);
  // }

  // getItems() {
  //   return this.tools;
  // }

  // clearCart() {
  //   this.tools = [];
  //   return this.tools;
  // }
}
