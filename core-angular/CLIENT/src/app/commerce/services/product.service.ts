import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Brand,
  Category,
  Product,
  filter,
  productsResponseModel,
} from '../models/product';
import { HttpResponseModel } from 'src/app/shared/models/httpResponseModel';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}
  module = 'Commerce/Product';
  getProducts(filter: filter) {
    return this.http.post<HttpResponseModel<productsResponseModel>>(
      `${environment.ApiEndpoint}${this.module}/GetProducts`,
      filter
    );
  }

  getProductById(id: number) {
    return this.http.get<HttpResponseModel<Product>>(
      `${environment.ApiEndpoint}${this.module}/GetProductById?id=${id}`
    );
  }

  getBrands() {
    return this.http.get<HttpResponseModel<Brand[]>>(
      `${environment.ApiEndpoint}${this.module}/GetBrands`
    );
  }

  getCategories() {
    return this.http.get<HttpResponseModel<Category[]>>(
      `${environment.ApiEndpoint}${this.module}/GetCategories`
    );
  }
}
