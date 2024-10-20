import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { NavComponent } from './components/nav/nav.component';
import { authGuard } from './auth/auth.guard';
import { EventsFindComponent } from './components/events/events-find/events-find.component';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [

  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  {
    path: 'events', component: NavComponent, children: [
      { path: 'find', component: EventsFindComponent }
    ]

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
