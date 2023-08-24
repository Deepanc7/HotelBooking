import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../search-bar/search.service';
import { SearchDetails } from '../search-bar/search-details.interface';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss'],
  providers: [SearchService]
})

export class HotelsComponent implements OnInit {
  searchDetails = {
    location: 'Your initial location',
    checkIn: new Date(), // Your initial check-in date
    checkOut: new Date(), // Your initial check-out date
    guestsAndRooms: 'Your initial guests and rooms value'
  };

  HotelData = JSON.parse(localStorage.getItem('hotel_data') || '[]');
  HotelDetails = JSON.parse(localStorage.getItem('hotel_details') || "[]");
  index: number = 0;;
  LowestRoomPrice: number[] = [];
  PriceRange: string = '';
  Parking: string = '';
  Tags: string = '';
  selectedTags: string[] = [];
  selectedRating: number = 0;
  tags: string[] = [
    'View', 'Air conditioning', 'Concierge', '24-hour front desk service',
    'Laundry service', 'Free wifi', 'Free parking', 'Restaurant', 'Bar',
    'Pool', 'Coffee in lobby', 'Continental breakfast'
  ];
  
  constructor(private router: Router, private searchService: SearchService) {
  }


  ngOnInit() {
    this.lowestRoomPrice();
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
  }
  
  addTag(tag: string) {
    if (!this.selectedTags.includes(tag)) {
      this.selectedTags.push(tag);
    }
  }
  removeTag(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    if (index !== -1) {
      this.selectedTags.splice(index, 1);
    }
  }
  lowestRoomPrice() {
    for (let i = 0; i < this.HotelData.length; i++) {
      let lowestPrice = Number.MAX_SAFE_INTEGER;
      for (const room of this.HotelData[i].Rooms) {
        if (room.BaseRate < lowestPrice) {
          lowestPrice = room.BaseRate;
        }
      }
      this.LowestRoomPrice.push(lowestPrice);
      this.HotelData[i].lowestPrice = lowestPrice;
      localStorage.setItem('hotel_data', JSON.stringify(this.HotelData));
    }
  }
  getStars(rating: number): string[] {
    const stars = Math.round(rating);
    return Array(stars).fill('star');
  }
  sendDataToHotelDetails(Object: any) {
    for (let i = 0; i < this.HotelData.length; i++) {
      if (this.HotelData[i] === Object) {
        this.index = i;
      }
    }
    localStorage.setItem('hotel_details', JSON.stringify(this.index));
    this.router.navigateByUrl('/hotel-details');
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
    if (this.Parking === "true") {
      this.HotelData = this.HotelData.filter((hotel: { ParkingIncluded: number; }) => hotel.ParkingIncluded == 1);
    }
    if (this.Parking === "false") {
      this.HotelData = this.HotelData.filter((hotel: { ParkingIncluded: number; }) => hotel.ParkingIncluded == 0);
    }
    if (this.selectedTags.length === 0) {
      this.HotelData = this.HotelData;
    }
    else {
      this.HotelData = this.HotelData.filter((hotel: any) =>
        this.selectedTags.some(tag => hotel.Tags.includes(tag)));
    }
    if (this.selectedRating === null) {
      this.HotelData = this.HotelData;
    }
    else {
      this.HotelData = this.HotelData.filter((hotel: any) => hotel.Rating >= this.selectedRating);
    }
  }
}





