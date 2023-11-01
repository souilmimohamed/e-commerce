import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { filter, Products, productsResponseModel } from './store/products';
import { environment } from 'src/environments/environment';
import { ResponseModel } from '../shared/models';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}
  module = 'Commerce/Product';
  get(filter: filter) {
    return this.http.post<ResponseModel<productsResponseModel>>(
      `${environment.apiEndpoint}/${this.module}/GetProducts`,
      filter
    );
  }
  create(product: Products) {
    let { Name, Category, PhotoUrl, Price, Brand, Description } = product;
    let obj = {
      Name,
      Category,
      PhotoUrl,
      Price,
      Brand,
      Description,
    };
    return this.http.post<ResponseModel<Products>>(
      `${environment.apiEndpoint}/${this.module}/createProduct`,
      obj
    );
  }
  getById(_id: string) {
    return this.http.get<ResponseModel<Products>>(
      `${environment.apiEndpoint}/${this.module}/GetProductById?id=${_id}`
    );
  }
}
