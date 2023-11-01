import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AuthState } from './store/auth.reducer';
import { InvokeAuthAPI } from './store/auth.action';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { Appstate } from '../shared/store/appstate';
import { state } from '@angular/animations';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  constructor(
    private fromBuilder: FormBuilder,
    private store: Store<AuthState>,
    private authStore$: Store<{ auth: AuthState }>,
    private appStore$: Store<{ appState: Appstate }>,
    private router: Router
  ) {}
  message?: string;
  authForm = this.fromBuilder.group({
    email: '',
    password: '',
  });
  ngOnInit(): void {}

  onSubmit(): void {
    this.store.dispatch(InvokeAuthAPI({ credentilas: this.authForm.value }));
    setTimeout(() => {
      this.getAuthState();
    });
  }
  isValid() {
    return (
      this.authForm &&
      this.authForm.value &&
      this.authForm.value.email &&
      this.authForm.value.password
    );
  }
  getAuthState() {
    this.authStore$
      .select((state) => state)
      .pipe(take(1))
      .subscribe((data) => {
        if (data.auth.message) this.message = data.auth.message;
        else this.router.navigate(['products']);
      });
  }
}
