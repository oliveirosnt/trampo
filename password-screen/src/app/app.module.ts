import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PasswordScreenComponent } from './password-screen/password-screen.component';
import {FormsModule} from "@angular/forms";
import {ToasterModule, ToasterService} from 'angular2-toaster';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [
    AppComponent,
    PasswordScreenComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ToasterModule.forRoot()
  ],
  providers: [FormsModule, ToasterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
