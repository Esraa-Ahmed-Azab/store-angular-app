import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../_services/products.service';
import { CommonModule } from '@angular/common';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';
import { FormsModule } from '@angular/forms';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-admin-page',
  imports: [CommonModule, AddEditProductComponent, FormsModule, PaginationModule],
  providers: [ProductsService],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss'
})
export class AdminPageComponent implements OnInit {
  productsList: any[] = [];
  isModalOpen = false;
  modalTitle = 'Add Product';
  editMode = false;
  selectedProduct: any;
  currentPage = 1;
  itemsPerPage = 10;

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.getProductsList();
  }

  getProductsList() {
    this.productsService.getProducts().subscribe(res => {
      this.productsList = res
      this.productsList.forEach((p: any) => p.checked = false);
    });
  }

  updateProduct(row: any) {
    this.modalTitle = 'Edit Product';
    this.editMode = true;
    this.selectedProduct = row;
    this.openModal();
  }

  deleteProduct(id: number) {
    this.productsService.deleteProduct(id).subscribe(res => {
      alert('Product deleted successfully!')
    },
      error => {
        alert('The following error occured while deleting product: ' + error)
      });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
}
