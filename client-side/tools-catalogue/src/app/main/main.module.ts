import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MainRoutingModule } from './main-routing.module';
import { CreateToolComponent } from './create-tool/create-tool.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailsComponent } from './details/details.component';
import { CatalogComponent } from './catalog/catalog.component';
import { RouterModule } from '@angular/router';
import { CatalogMachiningComponent } from './catalog-machining/catalog-machining.component';
import { EditToolComponent } from './edit-tool/edit-tool.component';
import { DeleteToolComponent } from './delete-tool/delete-tool.component';



@NgModule({
  declarations: [
    HomeComponent,
    CreateToolComponent,
    DetailsComponent,
    CatalogComponent,
    CatalogMachiningComponent,
    EditToolComponent,
    DeleteToolComponent,
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
