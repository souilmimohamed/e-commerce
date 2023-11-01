import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { switchMap } from 'rxjs';
import { Appstate } from 'src/app/shared/store/appstate';
import { Products } from '../store/products';
import { ProductsService } from '../products.service';
import { addToCart } from 'src/app/cart/store/cart.action';
import { cartItem } from 'src/app/cart/store/cart';
import { InvokeSaveNewWishlistItemAPI } from 'src/app/wishlist/store/wishlist.action';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private appStore: Store<Appstate>,
    private productService: ProductsService
  ) {}
  productForm: Products = {
    Id: -1,
    Brand: '',
    Category: '',
    Description: '',
    PhotoUrl: '',
    Name: '',
    Price: 0,
    InStock: false,
  };
  ngOnInit(): void {
    let fetchData$ = this.route.paramMap.pipe(
      switchMap((params) => {
        var id = String(params.get('id'));
        return this.productService.getById(id);
      })
    );
    fetchData$.subscribe((data) => {
      if (data) {
        this.productForm = data.Body;
      } else {
        this.router.navigate(['/']);
      }
    });
  }
  onAddToCart() {
    let data: cartItem = {
      id: '',
      productId: this.productForm.Id,
      brand: this.productForm.Brand,
      image: this.productForm.PhotoUrl,
      name: this.productForm.Name,
      price: this.productForm.Price,
      quantity: 1,
    };
    this.store.dispatch(addToCart({ item: data }));
  }

  onAddToWishlist() {
    this.store.dispatch(
      InvokeSaveNewWishlistItemAPI({ id: this.productForm.Id })
    );
  }
}
