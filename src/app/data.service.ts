import { Injectable } from '@angular/core';
import jsonData from '../assets/hotel_data.json';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl="http://localhost:8080";

  constructor(private http: HttpClient) {}

  getJsonData(): any {
    return JSON.parse(JSON.stringify(jsonData.value));
  }

  setHotelData(details: any): any {
    localStorage.setItem('hotel_data', JSON.stringify(details));
  }

  getHotelData(): any {
    return this.http.get(`${this.apiUrl}/hotels`);
  }
}