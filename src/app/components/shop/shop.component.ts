import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../service/product.service';


@Component({
  selector: 'app-shop',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
}) 
export class ShopComponent {

  isSidePanelVisible: boolean = false;
  productObj: any = {
    "productId": 0,
    "productSku": "",
    "productName": "",
    "productPrice": 0,
    "productDescription": "",
    "categoryId": 0,
    "createdDate": new Date(),
    "productImageUrl": ""
  };
  categoryList: any[] = [];
  productsList: any[] = [];
  cart: any[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
  }

  getProducts() {
    this.productService.getProducts().subscribe(
      (res: any) => {
        this.productsList = res;
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  }

  getCategories() {
    this.productService.getCategories().subscribe(
      (res: any) => {
        this.categoryList = res;
      },
      (error) => {
        console.error('Error fetching categories:', error);
      }
    );
  }
  addToCart(product: any) {
    console.log('Adding to cart:', product);
    const existingProduct = this.cart.find(item => item.productId === product.productId);
  
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      const cartItem = { ...product, quantity: 1 };
      this.cart.push(cartItem);
    }
  
    console.log('Updated Cart:', this.cart);
  }
  

  onEdit(item: any) {
    this.productObj = item;
    this.openSidePanel();
  }


  openSidePanel() {
    this.isSidePanelVisible = true;
  }

  closeSidePanel() {
    this.isSidePanelVisible = false;
  }


}
