import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SpinnerComponent } from './spinner/spinner.component';
import { MainModule } from '../main/main.module';

@NgModule({
  declarations: [SpinnerComponent],
  imports: [MatProgressSpinnerModule, CommonModule, MainModule],
  exports: [SpinnerComponent],
})
export class SharedModule {}
