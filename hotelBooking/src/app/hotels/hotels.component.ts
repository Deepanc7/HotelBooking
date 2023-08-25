import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../search-bar/search.service';
import { SearchDetails } from '../search-bar/search-details.interface';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss'],
  providers: [SearchService]
})
export class HotelsComponent implements OnInit {
  searchDetails: SearchDetails = {
    location: '',
    checkIn: new Date(),
    checkOut: new Date(),
    guestsAndRooms: ''
  };
  HotelData = JSON.parse(localStorage.getItem('hotel_data') || '[]');
  HotelDetails = JSON.parse(localStorage.getItem('hotel_details') || "[]");
  details: string = '';
  LowestRoomPrice: number[] = [];
  PriceRange: string = '';
  Parking: boolean | undefined;
  selectedTags: string[] = [];
  selectedRating: number = 0;
  selectedSortOption:string='';
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
  constructor(private router: Router, private searchService: SearchService, private route: ActivatedRoute) {
  }
  ngOnInit() {
    let search: SearchDetails = this.searchService.getSearchDetails();
    this.filterHotelData(search);
    this.HotelData = this.HotelData.filter((hotel: any) => {
      let loc = search.location.toLowerCase();
      let country = hotel.Address.Country.toLowerCase();
      let street = hotel.Address.StreetAddress.toLowerCase();
      let city = hotel.Address.City.toLowerCase();
      let state = hotel.Address.StateProvince;
      let postalcode = hotel.Address.PostalCode;
      if (country === loc || city == loc || street === loc || state === loc || postalcode === loc) {
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
    localStorage.setItem('hotel_details', JSON.stringify(this.details));
    this.router.navigateByUrl('/hotel-details');
  }
  applySort() {
    switch (this.selectedSortOption) {
      case 'lowToHigh':
        this.HotelData.sort((a: { lowestPrice: number; }, b: { lowestPrice: number; }) => a.lowestPrice - b.lowestPrice);
        break;
      case 'highToLow':
        this.HotelData.sort((a: { lowestPrice: number; }, b: { lowestPrice: number; }) => b.lowestPrice - a.lowestPrice);
        break;
      case 'popularity':
        this.HotelData.sort((a: { Rating: number; }, b: { Rating: number; }) => Number(b.Rating) - Number(a.Rating));
        break;
      default:
        this.HotelData.sort((a: { lowestPrice: number; }, b: { lowestPrice: number; }) => a.lowestPrice - b.lowestPrice);
        break;
    }
  }
  applyFilters() {
    this.HotelData = JSON.parse(localStorage.getItem('hotel_data') || '[]');
    let search: SearchDetails = this.searchService.getSearchDetails();
    this.HotelData = this.HotelData.filter((hotel: any) => {
      let loc = search.location.toLowerCase();
      let country = hotel.Address.Country.toLowerCase();
      let street = hotel.Address.StreetAddress.toLowerCase();
      let city = hotel.Address.City.toLowerCase();
      let state = hotel.Address.StateProvince;
      let postalcode = hotel.Address.PostalCode;
      if (country === loc || city == loc || street === loc || state === loc || postalcode === loc) {
        return true;
      }
      else { return false; }
    }
    );
    if (this.PriceRange === "Range1") {
      this.HotelData = this.HotelData.filter((hotel: { lowestPrice: number; }) => hotel.lowestPrice >= 0 && hotel.lowestPrice <= 50);
    }
    if (this.PriceRange === "Range2") {
      this.HotelData = this.HotelData.filter((hotel: { lowestPrice: number; }) => hotel.lowestPrice >= 50 && hotel.lowestPrice <= 100);
    }
    if (this.PriceRange === "Range3") {
      this.HotelData = this.HotelData.filter((hotel: { lowestPrice: number; }) => hotel.lowestPrice >= 100 && hotel.lowestPrice <= 150);
    }
    if (this.PriceRange === "Range4") {
      this.HotelData = this.HotelData.filter((hotel: { lowestPrice: number; }) => hotel.lowestPrice >= 150 && hotel.lowestPrice <= 200);
    }
    if (this.PriceRange === "Range5") {
      this.HotelData = this.HotelData.filter((hotel: { lowestPrice: number; }) => hotel.lowestPrice >= 200 && hotel.lowestPrice <= 250);
    }
    if (this.PriceRange === "Range6") {
      this.HotelData = this.HotelData.filter((hotel: { lowestPrice: number; }) => hotel.lowestPrice >= 250 && hotel.lowestPrice <= 300);
    }
    if (this.Parking === true) {
      this.HotelData = this.HotelData.filter((hotel: { ParkingIncluded: number; }) => hotel.ParkingIncluded == 1);
    }
    if (this.Parking === false) {
      this.HotelData = this.HotelData.filter((hotel: { ParkingIncluded: number; }) => hotel.ParkingIncluded == 0);
    }

    this.selectedTags = this.filterOptions.filter(option => option.selected) .map(option => option.label); 
    if (this.selectedTags.length!=0){
      console.log(this.selectedTags);
      this.HotelData = this.HotelData.filter((hotel: any) =>
        this.selectedTags.some(tag => hotel.Tags.includes(tag)));
    }
    if (this.selectedRating != null) {
      this.HotelData = this.HotelData.filter((hotel: any) => hotel.Rating >= this.selectedRating);
    }
  }
  searchHotels(details: SearchDetails) {
    this.filterHotelData(details);
  }
  private filterHotelData(searchDetails: SearchDetails) {
    this.HotelData = JSON.parse(localStorage.getItem('hotel_data') || '[]');
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