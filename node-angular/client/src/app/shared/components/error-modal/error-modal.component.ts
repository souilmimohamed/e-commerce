import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Appstate } from '../../store/appstate';
import { selectAppState } from '../../store/app.selector';
declare var window: any;

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.css'],
})
export class ErrorModalComponent implements OnInit {
  deleteModal: any;
  message: string[];
  constructor(private appStore: Store<Appstate>) {}

  ngOnInit(): void {
    let apiStatus$ = this.appStore.pipe(select(selectAppState));
    apiStatus$.subscribe((apiStatus) => {
      if (apiStatus.apiStatus === 'failure') {
        this.message = apiStatus.apiResponseMessage;
        this.setModal();
      }
    });
  }
  setModal() {
    this.deleteModal = new window.bootstrap.Modal(
      document.getElementById('deleteModal')
    );
    this.deleteModal.show();
  }
}
