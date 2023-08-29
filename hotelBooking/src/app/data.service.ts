import { Injectable } from '@angular/core';
import jsonData from '../assets/hotel_data.json';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  getJsonData(): any {
    return JSON.parse(JSON.stringify(jsonData));
  }
}
