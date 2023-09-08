import { Injectable } from '@angular/core';
import { SearchDetails } from './search-details.interface';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})

export class SearchService {
  private searchDetails: SearchDetails = {
    location: '',
    checkIn: new Date(),
    checkOut: new Date(),
    guestsAndRooms: ''
  };

  setSearchDetails(details: SearchDetails) {
    this.searchDetails=details;
    localStorage.setItem('searchDetails', JSON.stringify(this.searchDetails));
  }

  getSearchDetails(): SearchDetails {
    this.searchDetails = JSON.parse(localStorage.getItem('searchDetails') || "[]");
    return this.searchDetails;

  }
}