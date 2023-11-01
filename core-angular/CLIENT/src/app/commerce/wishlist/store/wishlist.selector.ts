import { createFeatureSelector } from '@ngrx/store';
import { WishlistItem } from '../../models/wishlist';

export const selectWishlist = createFeatureSelector<WishlistItem[]>('wishlist');
