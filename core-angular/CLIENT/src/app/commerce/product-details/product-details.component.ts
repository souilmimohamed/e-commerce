import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product';
import { Store } from '@ngrx/store';
import { AddToCart } from '../cart/store/cart.action';
import { cartItem } from '../models/cart';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  product$ = this.activatedRoute.paramMap.pipe(
    switchMap((params) => {
      const id = Number(params.get('id'));
      return this.productService.getProductById(id);
    })
  );
  product: Product;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.product$.subscribe((result) => {
      if (result.Success) this.product = result.Body;
    });
  }

  addToCart() {
    const item = new cartItem(this.product, 1);
    this.store.dispatch(AddToCart({ item }));
  }
}
