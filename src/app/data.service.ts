import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  getHotelData(): any {
    return this.http.get(`${this.apiUrl}/hotels`);
  }

  getHotelById(hotel_id: String): any {
    return this.http.get(`${this.apiUrl}/hotelById/${hotel_id}`);
  }
}