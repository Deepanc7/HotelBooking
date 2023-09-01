import { Injectable } from '@angular/core';
import jsonData from '../assets/hotel_data.json';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  getJsonData(): any {
    return JSON.parse(JSON.stringify(jsonData));
  }

  setHotelData(details: any): any {
    localStorage.setItem('hotel_data', JSON.stringify(details));
  }

  getHotelData(): any {
    return JSON.parse(localStorage.getItem('hotel_data') || '[]');
  }
}
