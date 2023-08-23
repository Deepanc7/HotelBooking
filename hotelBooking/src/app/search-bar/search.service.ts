import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchDetails: any;

  setSearchDetails(details: {location:string,checkIn:Date,checkOut:Date,guestAndRooms:string}) {
    this.searchDetails = details;
  }

  getSearchDetails() {
    return this.searchDetails;
  }
}