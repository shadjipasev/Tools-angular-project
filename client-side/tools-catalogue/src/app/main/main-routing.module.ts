import { AuthenticationGuard } from '../auth/guards/authentication.guard';
import { PermissionGuard } from '../auth/guards/permission.guard';
import { CatalogHandToolsComponent } from './catalog-hand-tools/catalog-hand-tools.component';
import { CatalogMachiningComponent } from './catalog-machining/catalog-machining.component';
import { CatalogPersonalEquipmentComponent } from './catalog-personal-equipment/catalog-personal-equipment.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CreateToolComponent } from './create-tool/create-tool.component';
import { DeleteToolComponent } from './delete-tool/delete-tool.component';
import { DetailsComponent } from './details/details.component';
import { EditToolComponent } from './edit-tool/edit-tool.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  // {
  //   path: 'data/catalog',
  //   component: CatalogComponent,
  //   // children: [
  //   //     {path: 'machining', component: CatalogMachiningComponent},
  //   //     {path: 'hand-tools', component: CatalogHandToolsComponent},
  //   //     {path: 'personal-equipment', component: CatalogPersonalEquipmentComponent},
  //   // ]
  // },
  { path: 'data/catalog/machining', component: CatalogMachiningComponent },

  { path: 'data/catalog/hand-tools', component: CatalogHandToolsComponent },

  {
    path: 'data/catalog/personal-equipment',
    component: CatalogPersonalEquipmentComponent,
  },

  {
    path: 'data/create',
    component: CreateToolComponent,
    canActivate: [PermissionGuard],
  },
  {
    path: 'data/cart',
    component: ShoppingCartComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'data/details/:id',
    component: DetailsComponent,
    canActivate: [AuthenticationGuard],
  },
  {
    path: 'data/edit/:id',
    component: EditToolComponent,
    canActivate: [PermissionGuard],
  },
  {
    path: 'data/delete/:id',
    component: DeleteToolComponent,
    canActivate: [PermissionGuard],
  },
  // {
  //   path: '%E2%80%AAhttps',
  //   component: DetailsComponent,
  // },
  { path: '404', component: PageNotFoundComponent },
  { path: '**', component: PageNotFoundComponent },
];

export const MainRoutingModule = RouterModule.forRoot(routes);
