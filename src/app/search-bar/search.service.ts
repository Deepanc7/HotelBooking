import { Injectable } from '@angular/core';
import { SearchDetails } from './search-details.interface';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hotel } from '../hotel.model';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private apiUrl = 'http://localhost:8080/api/hotels/search';

  constructor(private http: HttpClient) { }

  setSearchDetails(details: SearchDetails) {
    localStorage.setItem('searchDetails', JSON.stringify(details));
  }

  getSearchDetails(): SearchDetails {
    const storedDetails = localStorage.getItem('searchDetails');
    return storedDetails ? JSON.parse(storedDetails) : {
      location: '',
      checkIn: new Date(),
      checkOut: new Date(),
      guestsAndRooms: ''
    };
  }
  

  searchHotels(query: string): Observable<Hotel[]> {
    const params = new HttpParams().set('query', query);
    return this.http.get<Hotel[]>(this.apiUrl, { params });
  }
}