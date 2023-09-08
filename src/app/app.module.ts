import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { HotelsComponent } from './hotels/hotels.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModelModule } from './material-model/material-model.module';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';
import { HttpClientModule } from '@angular/common/http';
import { HomePageComponent } from './home-page/home-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { BookNowComponent } from './book-now/book-now.component';

import { ToastrModule } from 'ngx-toastr';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { EditPopUpComponent } from './edit-pop-up/edit-pop-up.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { LogoutComponent } from './logout/logout.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    HotelsComponent,
    HotelDetailsComponent,
    HomePageComponent,
    SignupPageComponent,
    SignInPageComponent,
    AboutPageComponent,
    LoginPageComponent,
    BookNowComponent,
    TermsAndConditionsComponent,
    ContactUsComponent,
    EditPopUpComponent,
    LogoutComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModelModule,
    HttpClientModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
  ],
  providers: [{provide: MAT_DATE_LOCALE, useValue: 'en-GB'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
