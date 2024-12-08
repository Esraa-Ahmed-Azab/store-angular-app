import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
baseUrl = 'https://fakestoreapi.com'
  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get<any>(this.baseUrl+'/products'); // Return an observable
  }

  addProduct(body:any): Observable<any>{
    return this.http.post<any>(this.baseUrl+'/products',body);
  }

  updateProduct(body:any, id:number): Observable<any>{
    return this.http.put<any>(this.baseUrl+`/products/${id}`,body);
  }

  deleteProduct(id:number): Observable<any>{
    return this.http.delete<any>(this.baseUrl+`/products/${id}`);
  }

  getCategories(): Observable<any> {
    return this.http.get<any>(this.baseUrl+'/products/categories');
  }

  getCategoryProducts(category: string): Observable<any> {
    return this.http.get<any>(this.baseUrl+`/products/category/${category}`);
  }
}
