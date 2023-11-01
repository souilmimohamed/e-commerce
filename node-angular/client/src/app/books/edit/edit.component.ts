import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Appstate } from 'src/app/shared/store/appstate';
import { Books } from '../store/books';
import { switchMap } from 'rxjs';
import { selectBookById } from '../store/books.selector';
import { invokeUpdateBookAPI } from '../store/books.action';
import { selectAppState } from 'src/app/shared/store/app.selector';
import { setAPIStatus } from 'src/app/shared/store/app.action';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class EditComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private appStore: Store<Appstate>
  ) {}
  booksForm: Books = {
    id: 0,
    author: '',
    name: '',
    cost: 0,
    image: '',
  };
  ngOnInit(): void {
    let fetchData$ = this.route.paramMap.pipe(
      switchMap((params) => {
        var id = Number(params.get('id'));
        return this.store.pipe(select(selectBookById(id)));
      })
    );

    fetchData$.subscribe((data) => {
      if (data) {
        this.booksForm = { ...data };
      } else {
        this.router.navigate(['/']);
      }
    });
  }

  update() {
    this.store.dispatch(
      invokeUpdateBookAPI({ updateBook: { ...this.booksForm } })
    );
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((apState) => {
      if (apState.apiStatus === 'success') {
        this.appStore.dispatch(
          setAPIStatus({ apiStatus: { apiResponseMessage: [], apiStatus: '' } })
        );
        this.router.navigate(['/']);
      }
    });
  }
}
