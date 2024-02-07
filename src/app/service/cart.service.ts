import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

interface Product {
  productId: number;
  productSku: string;
  productName: string;
  productImageUrl: string;
  productPrice: number;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject: BehaviorSubject<Product[]> = new BehaviorSubject<Product[]>([]);
  public cartItems$: Observable<Product[]> = this.cartItemsSubject.asObservable();

  constructor() {}

  addToCart(product: Product) {
    let cartItems = this.cartItemsSubject.getValue();
    const existingProduct = cartItems.find(item => item.productId === product.productId);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cartItems.push({ ...product, quantity: 1 });
    }

    this.cartItemsSubject.next(cartItems);
  }

  getCartItems(): Observable<Product[]> {
    return this.cartItems$;
  }

  updateItemQuantity(productId: number, quantity: number): void {
    const cartItems = this.cartItemsSubject.getValue();
    const itemIndex = cartItems.findIndex(item => item.productId === productId);

    if (itemIndex !== -1) {
      cartItems[itemIndex].quantity = Math.max(quantity, 0);
      this.cartItemsSubject.next(cartItems);
    }
  }

  removeItem(productId: number): void {
    const cartItems = this.cartItemsSubject.getValue();
    const updatedCart = cartItems.filter(item => item.productId !== productId);
    this.cartItemsSubject.next(updatedCart);
  }
}
