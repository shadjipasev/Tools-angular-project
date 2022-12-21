import { RouterModule, Routes } from "@angular/router"
import { ShoppingCartComponent } from "../main/shopping-cart/shopping-cart.component";
import { AuthenticationGuard } from "./guards/authentication.guard";
import { LoginComponent } from "./login/login.component";
import { ProfileComponent } from "./profile/profile.component";
import { RegisterComponent } from "./register/register.component";

const routes: Routes = [
    {
        path: 'auth/login',
        component: LoginComponent
    },
    {
        path: 'auth/register',
        component: RegisterComponent
    },
    {
        path: 'auth/profile/:id',
        component: ProfileComponent,
        canActivate: [AuthenticationGuard],
    },
    // {
    //     path: 'auth/profile/:id/shopping-cart',
    //     component: ShoppingCartComponent,
    //     canActivate: [AuthenticationGuard],
    // },
]


export const AuthRoutingModule = RouterModule.forRoot(routes);