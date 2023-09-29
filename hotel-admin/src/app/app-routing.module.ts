import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { ListHotelComponent } from './list-hotel/list-hotel.component';
import { AddHotelComponent } from './add-hotel/add-hotel.component';
import { ViewHotelComponent } from './view-hotel/view-hotel.component';
import { EditHotelComponent } from './edit-hotel/edit-hotel.component';

const routes: Routes = [
  {path : '',component : SignInComponent},
  {component: ListHotelComponent, path: 'allHotels' },
  { component: AddHotelComponent, path: 'addHotel' },
  { component: ViewHotelComponent, path: 'viewHotel/:index' },
  { component: EditHotelComponent, path: 'editHotel/:index'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
