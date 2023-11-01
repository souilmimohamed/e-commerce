import { createFeatureSelector } from '@ngrx/store';
import { wishlistItem } from './wishlist';
import { Products, Wishlist } from 'src/app/products/store/products';

export const selectWishlist = createFeatureSelector<Wishlist[]>('wishlist');
