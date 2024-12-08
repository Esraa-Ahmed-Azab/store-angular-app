import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../_services/products.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-page',
  imports: [CommonModule],
  providers: [ProductsService],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.scss'
})
export class UserPageComponent implements OnInit{
  categoriesList:string[]=[];
  productsList:any=[];
  pageTitle:string = '';
  constructor(private productsService: ProductsService){}

  ngOnInit() {
    this.getCategories();
  }

  getCategories(){
    this.productsService.getCategories().subscribe(res=> {
      this.categoriesList = res;
      this.pageTitle = this.categoriesList[0].toUpperCase();
      this.getCategoryProducts();
    })
  }

  getCategoryProducts(){
    this.productsService.getCategoryProducts(this.categoriesList[0]).subscribe(res=>{
      console.log(res);
      this.productsList = res;
    })
  }
}
