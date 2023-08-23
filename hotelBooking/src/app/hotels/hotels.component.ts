import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { SearchService } from '../search-bar/search.service';
import { SearchDetails } from '../search-bar/search-details.interface';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss'],
  providers: [SearchService]
})
export class HotelsComponent implements OnInit {

  HotelData = JSON.parse(localStorage.getItem('hotel_data') || '[]');
  HotelDetails = JSON.parse(localStorage.getItem('hotel_details') || "[]");
  hotels=this.HotelData;
  index:number=0;

  LowestRoomPrice: number[]=[];
  PriceRange:string='';
  Parking:string='';
  Tags:string='';

  tags: string[] = [
    'View', 'Air conditioning', 'Concierge', '24-hour front desk service',
    'Laundry service', 'Free wifi', 'Free parking', 'Restaurant', 'Bar',
    'Pool', 'Coffee in lobby', 'Continental breakfast'
  ];

  selectedTags: string[] = [];
  selectedRating: number = 0;
  searchDetails: SearchDetails;

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
    for(let i=0;i<this.HotelData.length;i++) {
    let lowestPrice = Number.MAX_SAFE_INTEGER;

    for (const room of this.HotelData[i].Rooms) {
      if (room.BaseRate < lowestPrice) {
        lowestPrice = room.BaseRate;
      }
    }
    this.LowestRoomPrice.push(lowestPrice);

    this.HotelData[i].lowestPrice=lowestPrice;
    localStorage.setItem('hotel_data', JSON.stringify(this.HotelData));
    }
  }

  constructor(private router: Router,private searchService: SearchService) {
   this.searchDetails=searchService.getSearchDetails();
  }

  ngOnInit() {
    this.lowestRoomPrice();
    this.searchDetails=this.searchService.getSearchDetails();
     this.applyFilters();
    console.log(this.searchDetails);
  }

  getStars(rating: number): string[] {
    const stars = Math.round(rating);
    return Array(stars).fill('star');
  }

  sendDataToHotelDetails(Object: any) {
    for(let i=0;i<this.HotelData.length;i++) {
      if (this.HotelData[i]===Object) {
        this.index=i;
      }
    }

    localStorage.setItem('hotel_details', JSON.stringify(this.index));
    this.router.navigateByUrl('/hotel-details');
  }

  applyFilters() {let search: SearchDetails = this.searchService.getSearchDetails();
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
}
