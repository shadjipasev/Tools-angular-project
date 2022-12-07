
import { RouterModule } from "@angular/router";
import { CatalogComponent } from "./catalog/catalog.component";
import { CreateToolComponent } from "./create-tool/create-tool.component";
import { HomeComponent } from "./home/home.component";

const routes = [
{
    path: '',
    match: 'full',
    component: HomeComponent
},
{
    path: 'create',
    component: CreateToolComponent,
},
{
    path: 'catalog',
    component: CatalogComponent,
},
]

export const MainRoutingModule = RouterModule.forRoot(routes)