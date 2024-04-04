import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';
import { HttpClientModule } from '@angular/common/http';
import { ToolService } from './main/services/tool/tool.service';
import { ReactiveFormsModule } from '@angular/forms';
import { appInterceptorProvider } from './app.interceptor';
import { MainRoutingModule } from './main/main-routing.module';
import { MainModule } from './main/main.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from './shared/shared.module';
import { SpinnerComponent } from './shared/spinner/spinner.component';

// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';
// import { MatCardModule } from '@angular/material/card';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [AppComponent, SpinnerComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    AuthModule,
    HttpClientModule,
    ReactiveFormsModule,
    MainModule,
    MainRoutingModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    SharedModule,
    // MatDialogModule,
    // MatInputModule,
    // MatButtonModule,
    // MatCardModule,
    // MatFormFieldModule,
  ],
  bootstrap: [AppComponent],
  providers: [ToolService, appInterceptorProvider],
})
export class AppModule {}
