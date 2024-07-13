import { Component, ErrorHandler, Inject } from '@angular/core';
import { GlobalErrorHandler } from '../services/error-handler/global-error-handler.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { MatDialog } from '@angular/material/dialog';

@Component({
  templateUrl: './error.component.html',
})
export class ErrorComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { message: string }) {}
}
