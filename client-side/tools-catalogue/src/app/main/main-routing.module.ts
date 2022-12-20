import { RouterModule, Routes } from "@angular/router";
import { CatalogComponent } from "./catalog/catalog.component";
import { CreateToolComponent } from "./create-tool/create-tool.component";
import { DeleteToolComponent } from "./delete-tool/delete-tool.component";
import { DetailsComponent } from "./details/details.component";
import { EditToolComponent } from "./edit-tool/edit-tool.component";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: HomeComponent
    },
    {
        path: 'data/catalog',
        component: CatalogComponent
    },
    {
        path: 'data/create',
        component: CreateToolComponent
    },
    {
        path: 'data/details/:id',
        component: DetailsComponent
    },
    {
        path: 'data/edit/:id',
        component: EditToolComponent
    },
    {
        path: 'data/delete/:id',
        component: DeleteToolComponent
    },


]

export const MainRoutingModule = RouterModule.forRoot(routes)