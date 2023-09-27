import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule, 
    MatFormFieldModule,
    MatNativeDateModule,
    MatButtonModule,
    MatRadioModule,
    MatSliderModule,
    MatListModule,
    MatSidenavModule,
   MatExpansionModule,
   MatSelectModule,
   MatChipsModule,
  ],
  exports: [
    MatIconModule,
    MatToolbarModule,
    MatCardModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatButtonModule,
    MatRadioModule,
    MatSliderModule,
    MatListModule,
    MatSidenavModule,
    MatExpansionModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatInputModule,
    MatChipsModule,
    MatGridListModule,
    MatButtonToggleModule,
  MatCheckboxModule,
   MatSlideToggleModule,
   MatDialogModule,
  ]
})
export class MaterialModule { }
