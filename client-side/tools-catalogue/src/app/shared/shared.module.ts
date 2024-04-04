import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppModule } from '../app.module';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  declarations: [SpinnerComponent],
  imports: [MatProgressSpinnerModule, CommonModule, SpinnerComponent],
})
export class SharedModule {}
