import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AuthInterceptorProvider } from './interceptors/auth.interceptor';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NavComponent } from './components/nav/nav.component';

// Angular Material
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatCheckbox } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    // Angular Material
    MatCheckbox
  ],
  providers: [AuthInterceptorProvider, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
