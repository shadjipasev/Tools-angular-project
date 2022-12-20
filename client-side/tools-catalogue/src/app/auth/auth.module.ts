import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';





@NgModule({
  declarations: [
   LoginComponent,
   RegisterComponent,
   ProfileComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [
  ],
  exports: [
    LoginComponent,
    RegisterComponent
  ]
  
})
export class AuthModule { }
