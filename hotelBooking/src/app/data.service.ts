import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import jsonData from '../assets/hotel_data.json';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  // Method to fetch JSON data
  getJsonData(): any {
    return JSON.parse(JSON.stringify(jsonData));
  }
}
