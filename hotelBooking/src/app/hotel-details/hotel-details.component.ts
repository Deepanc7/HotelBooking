import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Hotel,Room,Address,GeoPoint,Suggestion,ScoringFunction,ScoringProfile,Freshness,Magnitude,CorsOptions,IndexDefinition } from '../Hotel';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.scss']
})
export class HotelDetailsComponent {
  HotelData = JSON.parse(localStorage.getItem('hotel_data') || '[]');
}


