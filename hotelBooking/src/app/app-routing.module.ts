import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelsComponent } from './hotels/hotels.component';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

const routes: Routes = [
  {path:'', component:SearchBarComponent},
  { path: 'hotels', component: HotelsComponent },
  { path: 'hotel-details', component: HotelDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
