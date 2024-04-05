import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MainModule } from '../main/main.module';

@NgModule({
  declarations: [],
  imports: [MatProgressSpinnerModule, CommonModule, MainModule],
  exports: [],
})
export class SharedModule {}
