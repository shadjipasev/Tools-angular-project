import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { AuthRoutingModule } from '../auth/auth-routing.module';
import { MainRoutingModule } from '../main/main-routing.module';

@NgModule({
  declarations: [FooterComponent, HeaderComponent],
  imports: [CommonModule, AuthRoutingModule, MainRoutingModule],
  exports: [FooterComponent, HeaderComponent],
})
export class CoreModule {}
