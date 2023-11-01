import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { selectProducts } from './store/product.selector';
import { filter } from '../models/product';
import {
  InvokeBrandAPI,
  InvokeCategoryAPI,
  InvokeProductAPI,
} from './store/product.action';
import { invalid } from '@angular/compiler/src/render3/view/util';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  constructor(private store: Store) {}
  products$ = this.store.pipe(select(selectProducts));
  filter: filter = {
    Brand: '',
    Category: '',
    SearchText: '',
    SortPrice: '',
    PageSize: 5,
    PageNumer: 1,
  };
  selectedBrand: string;
  selectedCategory: string;
  SearchText: string;
  ngOnInit(): void {
    this.store.dispatch(InvokeProductAPI({ filter: this.filter }));
    this.store.dispatch(InvokeBrandAPI());
    this.store.dispatch(InvokeCategoryAPI());
  }

  brandSelect(brand: string) {
    this.filter = {
      ...this.filter,
      Brand: brand,
    };
    this.selectedBrand = brand;
    this.store.dispatch(InvokeProductAPI({ filter: this.filter }));
  }
  categorySelect(category: string) {
    this.filter = {
      ...this.filter,
      Category: category,
    };
    this.selectedCategory = category;
    this.store.dispatch(InvokeProductAPI({ filter: this.filter }));
  }

  sortChange(event: any) {
    this.filter = {
      ...this.filter,
      SortPrice: event.target.value,
    };
    this.store.dispatch(InvokeProductAPI({ filter: this.filter }));
  }
  applyFilter() {
    this.filter = {
      ...this.filter,
      SearchText: this.SearchText,
    };
    this.store.dispatch(InvokeProductAPI({ filter: this.filter }));
  }
  resetFilter() {
    this.filter = {
      Brand: '',
      Category: '',
      PageNumer: 1,
      PageSize: 5,
      SearchText: '',
      SortPrice: '',
    };
    this.store.dispatch(InvokeProductAPI({ filter: this.filter }));
    this.selectedCategory = '';
    this.selectedBrand = '';
    this.SearchText = '';
  }
  pageChanged(event: PageChangedEvent) {
    this.filter = {
      ...this.filter,
      PageNumer: event.page,
    };
    this.store.dispatch(InvokeProductAPI({ filter: this.filter }));
  }
}
