import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { setAPIStatus } from 'src/app/shared/store/app.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { Appstate } from 'src/app/shared/store/appstate';
import { convertBase64 } from '../../shared/utils/';
import { Products } from '../store/products';
import { InvokeSaveNewProductAPI } from '../store/products.action';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
})
export class AddComponent implements OnInit {
  constructor(
    private store: Store,
    private appStore: Store<Appstate>,
    private router: Router
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
  ngOnInit(): void {}
  async onUploadChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      let b64 = (await convertBase64(file)) as string;
      this.productForm.PhotoUrl = b64;
    }
  }
  save() {
    this.store.dispatch(InvokeSaveNewProductAPI({ product: this.productForm }));
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((apState) => {
      if (apState.apiStatus === 'success') {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: [], apiStatus: '' } })
        );
        this.router.navigate(['/products']);
      }
    });
  }
}
