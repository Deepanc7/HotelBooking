import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../search-bar/search.service';
import { SearchDetails } from '../search-bar/search-details.interface';
import { DataService } from '../data.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss'],
  providers: [SearchService, DataService]
})
export class HotelsComponent implements OnInit {
  searchDetails: SearchDetails = {
    location: '',
    checkIn: new Date(),
    checkOut: new Date(),
    guestsAndRooms: ''
  };
  HotelData: any;
  details: string = '';
  selectedTags: string[] = [];
  selectedRating: number = 0;
  selectedSortOption: string = '';
  LowestRoomPrice: number[] = [];
  PriceRange: string = '';
  Parking: boolean = false;
  Ratings = [1, 2, 3, 4, 5];


  filterOptions = [
    { label: 'View', selected: false },
    { label: 'Air conditioning', selected: false },
    { label: 'Concierge', selected: false },
    { label: '24-hour front desk service', selected: false },
    { label: 'Laundry service', selected: false },
    { label: 'Free wifi', selected: false },
    { label: 'Free parking', selected: false },
    { label: 'Restaurant', selected: false },
    { label: 'Bar', selected: false },
    { label: 'Pool', selected: false },
    { label: 'Coffee in lobby', selected: false },
    { label: 'Continental breakfast', selected: false },
  ];

  constructor(
    private router: Router,
    private searchService: SearchService,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.HotelData = this.dataService.getHotelData();
    const search: SearchDetails = this.searchService.getSearchDetails();
    this.filterHotelData(search);
  }

  getSelectedOptions(): string[] {
    return this.filterOptions
      .filter(option => option.selected)
      .map(option => option.label);
  }

  getStars(rating: number): string[] {
    const stars = Math.round(rating);
    return Array(stars).fill('star');
  }
  sendDataToHotelDetails(hotel: any) {
    this.router.navigate(['/hotel-details'], {
      queryParams: { details: JSON.stringify(hotel.HotelName) }
    });
  }

  applySort() {
    switch (this.selectedSortOption) {
      case 'lowToHigh':
        this.sortByLowestPrice();
        break;
      case 'highToLow':
        this.sortByHighestPrice();
        break;
      case 'popularity':
        this.sortByPopularity();
        break;
      default:
        this.sortByLowestPrice();
        break;
    }
  }

  sortByLowestPrice() {
    this.HotelData.sort((a: any, b: any) => a.lowestPrice - b.lowestPrice);
  }

  sortByHighestPrice() {
    this.HotelData.sort((a: any, b: any) => b.lowestPrice - a.lowestPrice);
  }

  sortByPopularity() {
    this.HotelData.sort((a: any, b: any) => b.Rating - a.Rating);
  }

  applyFilters() {
    const search: SearchDetails = this.searchService.getSearchDetails();
    const location = search.location.toLowerCase().trim();

    this.HotelData = this.HotelData.filter((hotel: any) => {
      const country = hotel.Address.Country.toLowerCase();
      const street = hotel.Address.StreetAddress.toLowerCase();
      const city = hotel.Address.City.toLowerCase();
      const state = hotel.Address.StateProvince.toLowerCase();
      const postalcode = hotel.Address.PostalCode.toLowerCase();
      const name = hotel.HotelName.toLowerCase();

      return (
        country === location ||
        city === location ||
        street === location ||
        state === location ||
        postalcode === location ||
        name === location
      );
    });

    this.applySort();
  }

  searchHotels(details: SearchDetails) {
    this.filterHotelData(details);
  }

  private filterHotelData(searchDetails: SearchDetails) {
    this.HotelData = this.dataService.getHotelData();
    this.applyFilters();
  }
}
