import { ErrorHandler, Inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ErrorComponent } from '../../error/error.component';
// import { throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
// import { HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private dialog: MatDialog) {}

  handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error + ' === ERROR');
    let errorMessage = 'An Unknown Error Occurred!';
    if (error instanceof HttpErrorResponse) {
      if (error.error && error.error.message) {
        errorMessage = error.error.message;
      }
    } else {
      const customError = error as { message: string };
      errorMessage = customError.message ? customError.message : errorMessage;
    }
    this.dialog.open(ErrorComponent, { data: { message: errorMessage } });
    // console.log(errorMessage);
    // console.error('An error occured:', error);
    return throwError(() => new Error('Something went wrong'));
  }
}
