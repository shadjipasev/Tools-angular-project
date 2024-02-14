import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { AuthenticationGuard } from './guards/authentication.guard';
import { RouterModule } from '@angular/router';
import { AuthenicationForLoggedUsers } from './guards/authentication-for-logged-users.guard';

@NgModule({
  declarations: [LoginComponent, RegisterComponent, ProfileComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  providers: [AuthenticationGuard, AuthenicationForLoggedUsers],
  exports: [LoginComponent, RegisterComponent],
})
export class AuthModule {}
