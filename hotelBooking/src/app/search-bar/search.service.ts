import { Injectable } from '@angular/core';
import { SearchDetails } from './search-details.interface';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private searchDetails: SearchDetails | undefined;

  setSearchDetails(details: SearchDetails) {
    this.searchDetails = details;
  }

  getSearchDetails() {
    return this.searchDetails;
  }
}