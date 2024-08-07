import { SubmitOrderComponent } from './submit-order/submit-order.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { MainRoutingModule } from './main-routing.module';
import { CreateToolComponent } from './create-tool/create-tool.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailsComponent } from './details/details.component';
import { CatalogComponent } from './catalog/catalog.component';

import { CatalogMachiningComponent } from './catalog-machining/catalog-machining.component';
import { EditToolComponent } from './edit-tool/edit-tool.component';
import { DeleteToolComponent } from './delete-tool/delete-tool.component';
import { AuthenticationGuard } from '../auth/guards/authentication.guard';
import { PermissionGuard } from '../auth/guards/permission.guard';
import { CatalogHandToolsComponent } from './catalog-hand-tools/catalog-hand-tools.component';
import { CatalogPersonalEquipmentComponent } from './catalog-personal-equipment/catalog-personal-equipment.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ArticleComponent } from './home/article/article.component';
import { SlideshowComponent } from './home/slideshow/slideshow.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterModule } from '@angular/router';
import { SafePipe } from 'safe-pipe';
import { SpinnerComponent } from './spinner/spinner.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    HomeComponent,
    CreateToolComponent,
    DetailsComponent,
    CatalogComponent,
    CatalogMachiningComponent,
    EditToolComponent,
    DeleteToolComponent,
    CatalogHandToolsComponent,
    CatalogPersonalEquipmentComponent,
    ShoppingCartComponent,
    PageNotFoundComponent,
    ArticleComponent,
    SlideshowComponent,
    SpinnerComponent,
    SubmitOrderComponent,
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    MainRoutingModule,
    CommonModule,
    RouterModule,
    MatProgressSpinnerModule,
    SafePipe,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatDialogModule,
  ],
  exports: [SpinnerComponent],
  providers: [AuthenticationGuard, PermissionGuard],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MainModule {}
