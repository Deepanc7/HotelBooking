import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelsComponent } from './hotels/hotels.component';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';
import { HomePageComponent } from './home-page/home-page.component';
import { SignupPageComponent } from './signup-page/signup-page.component';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { LoginPageComponent } from './login-page/login-page.component';

const routes: Routes = [
  {path:'', component:HomePageComponent},
  { path: 'hotels', component: HotelsComponent },
  { path: 'hotel-details', component: HotelDetailsComponent },
  {path:'homePage',component:HomePageComponent},
  {path: 'signupPage', component:SignupPageComponent},
  {path:'signin', component:SignInPageComponent},
  {path:'about',component:AboutPageComponent},
  {path:'login',component:LoginPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
