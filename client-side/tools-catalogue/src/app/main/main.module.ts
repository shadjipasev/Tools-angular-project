import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MainRoutingModule } from './main-routing.module';
import { CreateToolComponent } from './create-tool/create-tool.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailsComponent } from './details/details.component';
import { CatalogComponent } from './catalog/catalog.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    HomeComponent,
    CreateToolComponent,
    DetailsComponent,
    CatalogComponent,
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MainRoutingModule,
    CommonModule,
    RouterModule,

  ]
})
export class MainModule { }
