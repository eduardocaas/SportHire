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
import { EventsDashComponent } from './components/events/events-dash/events-dash.component';
import { DialogCreateComponent } from './components/events/events-dash/dialog-create/dialog-create.component';
import { DialogInfoComponent } from './components/events/events-dash/dialog-info/dialog-info.component';
import { DialogEditComponent } from './components/events/events-dash/dialog-edit/dialog-edit.component';
import { DialogDeleteComponent } from './components/events/events-dash/dialog-delete/dialog-delete.component';

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
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';

// Others
import { ToastrModule } from 'ngx-toastr';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { NgxMaskDirective, NgxMaskPipe, provideEnvironmentNgxMask } from 'ngx-mask';
import { DialogLogoutComponent } from './components/nav/dialog-logout/dialog-logout.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    NavComponent,
    EventsFindComponent,
    HomeComponent,
    EventsDashComponent,
    DialogCreateComponent,
    DialogInfoComponent,
    DialogEditComponent,
    DialogDeleteComponent,
    DialogLogoutComponent
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
    MatRadioModule,
    MatDialogModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatSlideToggleModule,
    MatMenuModule,

    // Others
    NgxMaterialTimepickerModule,
    NgxMaskDirective,
    NgxMaskPipe,
    ToastrModule.forRoot({
      timeOut: 5000,
      preventDuplicates: true,
      closeButton: true,
      progressBar: true
    }),
  ],
  providers: [AuthInterceptorProvider, provideAnimationsAsync(), provideEnvironmentNgxMask()],
  bootstrap: [AppComponent]
})
export class AppModule { }
