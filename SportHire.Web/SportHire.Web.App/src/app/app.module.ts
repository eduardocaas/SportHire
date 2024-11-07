// Angular
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { NgFor } from '@angular/common';
import { AsyncPipe } from '@angular/common';
import { AuthInterceptorProvider } from './interceptors/auth.interceptor';
import { HttpClientModule } from '@angular/common/http';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NavComponent } from './components/nav/nav.component';
import { EventsFindComponent } from './components/events/events-find/events-find.component';
import { HomeComponent } from './components/home/home.component';
import { EventsDashComponent } from './components/events-dash/events-dash.component';

// Forms
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Angular Material
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSelectModule } from '@angular/material/select';

// Others
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NavComponent,
    EventsFindComponent,
    HomeComponent,
    EventsDashComponent
  ],
  imports: [
    // Angular
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgFor,
    AsyncPipe,

    // Forms
    FormsModule,
    ReactiveFormsModule,

    // Angular Material
    MatCheckbox,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatSelectModule,

    // Others
    ToastrModule.forRoot({
      timeOut: 5000,
      preventDuplicates: true,
      closeButton: true,
      progressBar: true
    }),
  ],
  providers: [AuthInterceptorProvider, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
