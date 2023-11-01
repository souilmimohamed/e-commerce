import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AlertModule.forRoot(),
    ModalModule.forRoot(),
  ],
  exports: [ReactiveFormsModule, FormsModule, AlertModule, ModalModule],
})
export class SharedModule {}
