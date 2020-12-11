import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CategoriesComponent} from './admin/categories/categories.component';
import {LocationsComponent} from './admin/locations/locations.component';
import {EventsComponent} from './events/events.component';
import {EventComponent} from './event/event.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'categories',
    component: CategoriesComponent
  },
  {
    path: 'locations',
    component: LocationsComponent
  },
  {
    path: 'events',
    component: EventsComponent
  },
  {
    path: 'event/:id',
    component: EventComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
