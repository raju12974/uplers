import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SingletonService} from './singleton';
import {HttpErrorHandler} from './http-error-handler.service';
import {SharedService} from './shared-service';
import {httpInterceptorProviders} from './http-interceptors';
import {MessageService} from './message.service';
import {AuthService} from './auth.service';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { EventsComponent } from './events/events.component';
import { EventComponent } from './event/event.component';
import { CategoriesComponent } from './admin/categories/categories.component';
import { LocationsComponent } from './admin/locations/locations.component';
import {FormsModule} from '@angular/forms';
import { AddEventComponent } from './admin/add-event/add-event.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    EventsComponent,
    EventComponent,
    CategoriesComponent,
    LocationsComponent,
    AddEventComponent
  ],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        FormsModule
    ],
  providers: [
    SingletonService,
    HttpErrorHandler,
    AuthService,
    SharedService,
    MessageService,
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
