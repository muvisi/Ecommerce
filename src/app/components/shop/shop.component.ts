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
  // onUpdate() {
  //   this.productSrv.saveProduct(this.productObj).subscribe((res:any)=>{
  //     debugger;
  //     if(res.result) {
  //       alert("Product Created");
  //       this.getProducts();
  //     } else {
  //       alert(res.message)
  //     }
  //   })
  // }
  // onSave() {
  //   this.productSrv.saveProduct(this.productObj).subscribe((res:any)=>{
  //     debugger;
  //     if(res.result) {
  //       alert("Product Updated");
  //       this.getProducts();
  //     } else {
  //       alert(res.message)
  //     }
  //   })
  // }
  // onDelete(item: any) {
  //   const isDelete = confirm('Are you Sure want to delte');
  //   if(isDelete) {
  //     this.productSrv.deleteProduct(item.productId).subscribe((res:any)=>{
  //       debugger;
  //       if(res.result) {
  //         alert("Product Deleted");
  //         this.getProducts();
  //       } else {
  //         alert(res.message)
  //       }
  //     })
  //   }
  // }

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
