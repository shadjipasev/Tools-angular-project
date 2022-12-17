import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http'
import { ToolService } from './main/services/tool/tool.service';
import { ReactiveFormsModule } from '@angular/forms';
import { appInterceptorProvider } from './app.interceptor';
import { MainRoutingModule } from './main/main-routing.module';
import { MainModule } from './main/main.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    AuthModule,
    HttpClientModule,
    ReactiveFormsModule,
    MainModule,
    MainRoutingModule
  ],
  providers: [
    ToolService,
    appInterceptorProvider,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
