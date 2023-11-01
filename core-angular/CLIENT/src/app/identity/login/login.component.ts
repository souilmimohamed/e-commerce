import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IdentityService } from '../identity.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { Store } from '@ngrx/store';
import { IdentityState } from '../store/identity.reducer';
import { InvokeLoginAPI } from '../store/identity.action';
import { map, take } from 'rxjs/operators';
import { ResponseError } from 'src/app/shared/models/httpResponseModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errors: any;
  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      Email: [null, [Validators.required]],
      Password: [null, [Validators.required]],
    });
  }
  login() {
    if (this.loginForm.invalid) return;
    this.store.dispatch(InvokeLoginAPI({ credentials: this.loginForm.value }));
  }
}
