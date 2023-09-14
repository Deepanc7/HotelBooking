import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  LowestRoomPrice: number[] = [];
  PriceRange: string = '';
  Parking: boolean | undefined;
  selectedTags: string[] = [];
  selectedRating: number = 0;
  selectedSortOption: string = '';
  Ratings = [1, 2, 3, 4, 5];
  tags: string[] = [
    'View', 'Air conditioning', 'Concierge', '24-hour front desk service',
    'Laundry service', 'Free wifi', 'Free parking', 'Restaurant', 'Bar',
    'Pool', 'Coffee in lobby', 'Continental breakfast'
  ];

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
  constructor(private router: Router, private searchService: SearchService, private dataService: DataService) {
  }
  ngOnInit() {
    this.HotelData = this.dataService.getHotelData();
    let search: SearchDetails = this.searchService.getSearchDetails();
    this.filterHotelData(search);
    this.HotelData = this.HotelData.filter((hotel: any) => {
      let loc = search.location.toLowerCase().trim();
      let country = hotel.Address.Country.toLowerCase();
      let street = hotel.Address.StreetAddress.toLowerCase();
      let city = hotel.Address.City.toLowerCase();
      let state = hotel.Address.StateProvince;
      let postalcode = hotel.Address.PostalCode;
      let name = hotel.HotelName.toLowerCase();
      if (country === loc || city == loc || street === loc || state === loc || postalcode === loc || name === loc) {
        return true;
      }
      else { return false; }
    }
    );
  }
  getSelectedOptions(): string[] {
    return this.filterOptions.filter(option => option.selected).map(option => option.label);
  }

  getStars(rating: number): string[] {
    const stars = Math.round(rating);
    return Array(stars).fill('star');
  }

  sendDataToHotelDetails(Object: any) {
    for (let i = 0; i < this.HotelData.length; i++) {
      if (this.HotelData[i] === Object) {
        this.details = String(this.HotelData[i].HotelName);
      }
    }
    const navigationExtras = {
      queryParams: {
        details: JSON.stringify(this.details)
      }
    };
    this.router.navigate(['/hotel-details'], navigationExtras);
  }

  applySort() {
    switch (this.selectedSortOption) {
      case 'lowToHigh':
        this.HotelData.sort((a: { LowestPrice: number; }, b: { LowestPrice: number; }) => a.LowestPrice - b.LowestPrice);
        break;
      case 'highToLow':
        this.HotelData.sort((a: { LowestPrice: number; }, b: { LowestPrice: number; }) => b.LowestPrice - a.LowestPrice);
        break;
      case 'popularity':
        this.HotelData.sort((a: { Rating: number; }, b: { Rating: number; }) => Number(b.Rating) - Number(a.Rating));
        break;
      default:
        this.HotelData.sort((a: { LowestPrice: number; }, b: { LowestPrice: number; }) => a.LowestPrice - b.LowestPrice);
        break;
    }
  }
  applyFilters() {
    this.HotelData = this.dataService.getHotelData();
    let search: SearchDetails = this.searchService.getSearchDetails();
    this.HotelData = this.HotelData.filter((hotel: any) => {
      let loc = search.location.toLowerCase().trim();
      let country = hotel.Address.Country.toLowerCase();
      let street = hotel.Address.StreetAddress.toLowerCase();
      let city = hotel.Address.City.toLowerCase();
      let state = hotel.Address.StateProvince;
      let postalcode = hotel.Address.PostalCode;
      let name = hotel.HotelName.toLowerCase();
      if (country === loc || city == loc || street === loc || state === loc || postalcode === loc || name === loc) {
        return true;
      }
      else { return false; }
    }
    );
    if (this.PriceRange === "Range1") {
      this.HotelData = this.HotelData.filter((hotel: { LowestPrice: number; }) => hotel.LowestPrice >= 0 && hotel.LowestPrice <= 50);
    }
    if (this.PriceRange === "Range2") {
      this.HotelData = this.HotelData.filter((hotel: { LowestPrice: number; }) => hotel.LowestPrice >= 50 && hotel.LowestPrice <= 100);
    }
    if (this.PriceRange === "Range3") {
      this.HotelData = this.HotelData.filter((hotel: { LowestPrice: number; }) => hotel.LowestPrice >= 100 && hotel.LowestPrice <= 150);
    }
    if (this.PriceRange === "Range4") {
      this.HotelData = this.HotelData.filter((hotel: { LowestPrice: number; }) => hotel.LowestPrice >= 150 && hotel.LowestPrice <= 200);
    }
    if (this.PriceRange === "Range5") {
      this.HotelData = this.HotelData.filter((hotel: { LowestPrice: number; }) => hotel.LowestPrice >= 200 && hotel.LowestPrice <= 250);
    }
    if (this.PriceRange === "Range6") {
      this.HotelData = this.HotelData.filter((hotel: { LowestPrice: number; }) => hotel.LowestPrice >= 250 && hotel.LowestPrice <= 300);
    }
    if (this.Parking === true) {
      this.HotelData = this.HotelData.filter((hotel: any) => hotel.ParkingIncluded == true);
    }
    if (this.Parking === false) {
      this.HotelData = this.HotelData.filter((hotel: any) => hotel.ParkingIncluded == false);
    }

    this.selectedTags = this.filterOptions.filter(option => option.selected).map(option => option.label);
    for (let i=0;i<this.selectedTags.length;i++) {
      this.selectedTags[i]=this.selectedTags[i].trim().toLowerCase();
    }
    if (this.selectedTags.length != 0) {
      this.HotelData = this.HotelData.filter((hotel: { Tags: any[]; }) =>
        hotel.Tags.some((tag: string) => this.selectedTags.includes(tag.trim().toLowerCase()))
      );
    }
    if (this.selectedRating != null) {
      this.HotelData = this.HotelData.filter((hotel: any) => hotel.Rating >= this.selectedRating);
    }
  }

  searchHotels(details: SearchDetails) {
    this.filterHotelData(details);
  }

  private filterHotelData(searchDetails: SearchDetails) {
    this.HotelData = this.dataService.getHotelData();
    this.HotelData = this.HotelData.filter((hotel: any) => {
      let loc = searchDetails.location.toLowerCase();
      let country = hotel.Address.Country.toLowerCase();
      let street = hotel.Address.StreetAddress.toLowerCase();
      let city = hotel.Address.City.toLowerCase();
      let state = hotel.Address.StateProvince;
      let postalcode = hotel.Address.PostalCode;
      if (country === loc || city == loc || street === loc || state === loc || postalcode === loc) {
        return true;
      } else {
        return false;
      }
    });

    this.applyFilters();
  }

}