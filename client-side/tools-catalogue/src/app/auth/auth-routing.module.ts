import { RouterModule, Routes } from '@angular/router';
import { AuthenicationForLoggedUsers } from './guards/authentication-for-logged-users.guard';
import { AuthenticationGuard } from './guards/authentication.guard';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: 'auth/login',
    component: LoginComponent,
    canActivate: [AuthenicationForLoggedUsers],
  },
  {
    path: 'auth/register',
    component: RegisterComponent,
    canActivate: [AuthenicationForLoggedUsers],
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
];

export const AuthRoutingModule = RouterModule.forRoot(routes);
