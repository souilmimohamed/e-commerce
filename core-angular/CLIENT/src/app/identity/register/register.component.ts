import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IdentityService } from '../identity.service';
import { LocalStorageService } from 'src/app/shared/services/local-storage.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { InvokeRegisterAPI } from '../store/identity.action';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      Email: [null, [Validators.required, Validators.email]],
      Username: [null, [Validators.required]],
      Password: [
        null,
        [
          Validators.required,
          Validators.pattern('^(?=.*[A-Z])(?=.*\\d)(?=.*\\W).{6,}$'),
        ],
      ],
    });
  }

  register() {
    if (this.registerForm.invalid) return;
    this.store.dispatch(
      InvokeRegisterAPI({ credentials: this.registerForm.value })
    );
  }
}
