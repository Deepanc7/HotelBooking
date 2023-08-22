import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { HotelsComponent } from './hotels/hotels.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MaterialModelModule } from './material-model/material-model.module';


@NgModule({
  declarations: [
    AppComponent,
    SearchBarComponent,
    HotelsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModelModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
