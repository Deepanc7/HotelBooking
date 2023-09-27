import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../search-bar/search.service';
import { SearchDetails } from '../search-bar/search-details.interface';
import { ToastrService } from 'ngx-toastr';
import { Hotel } from '../hotel.model';

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
  HotelData: Hotel[]=[];
  HotelTemp:Hotel[]=[];
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
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    const search: SearchDetails = this.searchService.getSearchDetails();
    this.searchService.searchHotels(search.location).subscribe(
      (response) => {
        if (response.length > 0) {
          this.HotelData = response;
          this.lowestRoomPrice();
          this.HotelTemp=this.HotelData;
        } else {
          this.toastr.warning('Location doesn\'t exist.', 'No Results Found');
        }
      },
      (error) => {
        console.error('Error while searching for hotels:', error);
      }
    );

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
      queryParams: { details: JSON.stringify(hotel.hotelName) }
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
    this.HotelData.sort((a: any, b: any) => b.rating - a.rating);
  }

  applyFilters() {
    this.HotelData=this.HotelTemp;
    if (this.PriceRange === "Range1") {
      this.HotelData = this.HotelData.filter((hotel: Hotel) => hotel.lowestPrice >= 0 && hotel.lowestPrice <= 50);
    }
    if (this.PriceRange === "Range2") {
      this.HotelData = this.HotelData.filter((hotel: Hotel) => hotel.lowestPrice >= 50 && hotel.lowestPrice <= 100);
    }
    if (this.PriceRange === "Range3") {
      this.HotelData = this.HotelData.filter((hotel: Hotel) => hotel.lowestPrice >= 100 && hotel.lowestPrice <= 150);
    }
    if (this.PriceRange === "Range4") {
      this.HotelData = this.HotelData.filter((hotel: Hotel) => hotel.lowestPrice >= 150 && hotel.lowestPrice <= 200);
    }
    if (this.PriceRange === "Range5") {
      this.HotelData = this.HotelData.filter((hotel: Hotel) => hotel.lowestPrice >= 200 && hotel.lowestPrice <= 250);
    }
    if (this.PriceRange === "Range6") {
      this.HotelData = this.HotelData.filter((hotel: Hotel) => hotel.lowestPrice >= 250 && hotel.lowestPrice <= 300);
    }
    if (this.Parking === true) {
      this.HotelData = this.HotelData.filter((hotel: Hotel) => hotel.parkingIncluded == true);
    }

    this.selectedTags = this.filterOptions.filter(option => option.selected).map(option => option.label);
    for (let i=0;i<this.selectedTags.length;i++) {
      this.selectedTags[i]=this.selectedTags[i].trim().toLowerCase();
    }
    if (this.selectedTags.length != 0) {
      this.HotelData = this.HotelData.filter((hotel: Hotel) =>
        hotel.tags.some((tag: string) => this.selectedTags.includes(tag.trim().toLowerCase()))
      );
    }
    if (this.selectedRating != null) {
      this.HotelData = this.HotelData.filter((hotel: Hotel) => hotel.rating >= this.selectedRating);
    }
    

    this.applySort();
  }

  searchHotels(details: SearchDetails) {
    this.filterHotelData(details);
  }

  private filterHotelData(searchDetails: SearchDetails) {
    this.searchService.searchHotels(searchDetails.location).subscribe(
      (response) => {
        if (response.length > 0) {
          this.HotelData = response;
          this.lowestRoomPrice();
          this.HotelTemp=this.HotelData;
        } else {
          this.toastr.warning('Location doesn\'t exist.', 'No Results Found');
        }
      },
      (error) => {
        console.error('Error while searching for hotels:', error);
      }
    );

    this.applyFilters();
  }
  lowestRoomPrice() {
    for (let i = 0; i < this.HotelData.length; i++) {
      let lowestPrice = Number.MAX_SAFE_INTEGER;
      for (const room of this.HotelData[i].rooms) {
        if (room.baseRate < lowestPrice) {
          lowestPrice = room.baseRate;
        }
      }
      this.LowestRoomPrice.push(lowestPrice);
      this.HotelData[i].lowestPrice = lowestPrice;
    }
  }

}