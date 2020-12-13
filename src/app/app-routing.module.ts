import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CategoriesComponent} from './admin/categories/categories.component';
import {LocationsComponent} from './admin/locations/locations.component';
import {EventsComponent} from './events/events.component';
import {EventComponent} from './event/event.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {NoAuthGuard} from './no-auth.guard';
import {AuthGuard} from './auth.guard';
import {AddEventComponent} from './admin/add-event/add-event.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NoAuthGuard]
  },
  {
    path: 'categories',
    component: CategoriesComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'locations',
    component: LocationsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'events',
    component: EventsComponent,
  },
  {
    path: 'event/:id',
    component: EventComponent,
  },{
    path: 'add-event',
    component: AddEventComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
