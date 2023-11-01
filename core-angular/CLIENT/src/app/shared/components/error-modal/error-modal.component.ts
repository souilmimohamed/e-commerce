import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.component.html',
  styleUrls: ['./error-modal.component.scss'],
})
export class ErrorModalComponent implements OnInit {
  errors: string[];
  constructor(private bsModalRef: BsModalRef) {}

  ngOnInit(): void {}
  close() {
    this.bsModalRef.hide();
  }
}
