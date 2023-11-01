import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { HomeComponent } from './home/home.component';
import { BooksReducer } from './store/books.reducer';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BooksEffect } from './store/books.effect';
import { AddComponent } from './add/add.component';
import { FormsModule } from '@angular/forms';
import { EditComponent } from './edit/edit.component';
@NgModule({
  declarations: [HomeComponent, AddComponent, EditComponent],
  imports: [
    CommonModule,
    BooksRoutingModule,
    StoreModule.forFeature('mybooks', BooksReducer),
    EffectsModule.forFeature([BooksEffect]),
    FormsModule,
  ],
})
export class BooksModule {}
