

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private apiKey = environment.openWeatherMapApiKey;

  constructor(private http: HttpClient) {}

  getWeatherByCityName(cityName: string) {
    const params = `q=${cityName}&appid=${this.apiKey}`;
    return this.http.get(`${this.apiUrl}?${params}`);
  }
}
