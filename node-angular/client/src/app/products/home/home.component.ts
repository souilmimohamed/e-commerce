import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Appstate } from 'src/app/shared/store/appstate';
import { filter } from '../store/products';
import {
  InvokeProductsAPI,
  InvokeProductsSearch,
} from '../store/products.action';
import { selectProducts } from '../store/products.selector';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private store: Store) {}
  products$ = this.store.pipe(select(selectProducts));
  requestedPage = 0;
  searchText: string;
  filter: filter = {
    Brand: '',
    Category: '',
    SearchText: '',
    SortPrice: '',
    PageSize: 10,
    PageNumer: 1,
  };
  ngOnInit(): void {
    this.store.dispatch(InvokeProductsAPI({ filter: this.filter }));
  }
  onScroll(): void {
    let newFilter = {
      ...this.filter,
      searchText: this.searchText,
      PageNumer: this.requestedPage + 1,
    };
    this.store.dispatch(InvokeProductsAPI({ filter: newFilter }));
    this.requestedPage++;
  }
  search() {
    let newFilter = {
      ...this.filter,
      PageNumer: this.requestedPage,
      searchText: this.searchText,
    };
    this.store.dispatch(InvokeProductsSearch({ filter: newFilter }));
  }
  searchEnter(event: any) {
    let newFilter = {
      ...this.filter,
      PageNumer: this.requestedPage,
      searchText: event.target.value,
    };
    this.store.dispatch(InvokeProductsSearch({ filter: newFilter }));
  }
}
