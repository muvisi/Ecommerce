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

  isSidePanelVisible: boolean= false;
  productObj: any = {
    "productId": 0,
    "productSku": "",
    "productName": "",
    "productsPrice": 0,
    "productDescription": "",
    "createdDate": new Date(),
     
  }
  categoryList: any [] = [];
  productsList: any [] = [];

  constructor(private productSrv: ProductService) {
    
  }
  ngOnInit(): void {
    this.getProducts();
    this.getALlCategory();
  }
  getProducts() {
    this.productSrv.getProducts().subscribe((res:any)=>{
      this.productsList = res.data;
    })
  }

  getALlCategory() {
    this.productSrv.getCategory().subscribe((res:any)=>{
      this.categoryList = res.data;
    })
  }
  onUpdate() {
    this.productSrv.saveProduct(this.productObj).subscribe((res:any)=>{
      debugger;
      if(res.result) {
        alert("Product Created");
        this.getProducts();
      } else {
        alert(res.message)
      }
    })
  }
  onSave() {
    this.productSrv.saveProduct(this.productObj).subscribe((res:any)=>{
      debugger;
      if(res.result) {
        alert("Product Updated");
        this.getProducts();
      } else {
        alert(res.message)
      }
    })
  }
  onDelete(item: any) {
    const isDelete = confirm('Are you Sure want to delte');
    if(isDelete) {
      this.productSrv.deleteProduct(item.productId).subscribe((res:any)=>{
        debugger;
        if(res.result) {
          alert("Product Deleted");
          this.getProducts();
        } else {
          alert(res.message)
        }
      })
    }
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
