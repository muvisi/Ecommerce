import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnChanges {
  @Input() cart: any[] = [];
  productPrice: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cart']) {
      this.calculateTotalPrice();
    }
  }

  trackByFn(index: number, item: any): number {
    return item.productId;
  }

  handleRemove(productId: number): void {
    this.cart = this.cart.filter(item => item.productId !== productId);
    this.calculateTotalPrice();
  }

  handleChange(item: any, quantity: number): void {
    // Implement your logic to update the quantity here
    item.quantity += quantity;
    this.calculateTotalPrice();
  }

  private calculateTotalPrice(): void {
    this.productPrice = this.cart.reduce((total, item) => total + item.productPrice * item.quantity, 0);
  }
}
