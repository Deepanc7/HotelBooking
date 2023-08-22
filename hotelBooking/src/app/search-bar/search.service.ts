import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchDetails: any;

  setSearchDetails(details: any) {
    this.searchDetails = details;
  }

  getSearchDetails() {
    return this.searchDetails;
  }
}