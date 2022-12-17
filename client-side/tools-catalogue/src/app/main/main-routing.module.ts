
import { RouterModule, Routes } from "@angular/router";
import { Router } from "express";
import { CatalogComponent } from "./catalog/catalog.component";
import { CreateToolComponent } from "./create-tool/create-tool.component";
import { HomeComponent } from "./home/home.component";

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: HomeComponent
    },
    {
        path: 'catalog',
        component: CatalogComponent,
    },
    {
        path: 'data/create',
        component: CreateToolComponent,
    },
]

export const MainRoutingModule = RouterModule.forRoot(routes)