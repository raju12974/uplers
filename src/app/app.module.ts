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

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule
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
