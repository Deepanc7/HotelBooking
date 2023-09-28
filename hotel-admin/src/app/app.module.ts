import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { SignInComponent } from './sign-in/sign-in.component';
import { FormsModule } from '@angular/forms'
import { ReactiveFormsModule } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { HttpClientModule } from '@angular/common/http';
import { AddHotelComponent } from './add-hotel/add-hotel.component';
import { ListHotelComponent } from './list-hotel/list-hotel.component';
import { EditHotelComponent } from './edit-hotel/edit-hotel.component';
import { ViewHotelComponent } from './view-hotel/view-hotel.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    AddHotelComponent,
    ListHotelComponent,
    EditHotelComponent,
    ViewHotelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
