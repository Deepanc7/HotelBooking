import { Component } from '@angular/core';
import { SearchService } from '../search-bar/search.service';
import { SearchDetails } from '../search-bar/search-details.interface';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.scss'],
  providers: [SearchService]
})
export class HotelDetailsComponent {
  HotelData = JSON.parse(localStorage.getItem('hotel_data') || '[]');
  HotelDetails = JSON.parse(localStorage.getItem('hotel_details')||"");

  GuestCount:number=0;
  RoomCount:number=0;
  checkInDate:any;
  checkOutDate:any;

  searchDetails: SearchDetails = {
    location: '',
    checkIn: new Date(),
    checkOut: new Date(),
    guestsAndRooms: ''
  };

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    let search: SearchDetails = this.searchService.getSearchDetails();
    let x = search.guestsAndRooms.split(" ");
    this.GuestCount=Number(x[0])+Number(x[2]);
    this.RoomCount=Number(x[4]);
    this.checkInDate=search.checkIn;
    this.checkOutDate=search.checkOut;
  }

  searchHotelByName(hotelName:string) {
    const foundHotel = this.HotelData.find((hotel: { HotelName: string; }) => String(hotel.HotelName) === hotelName);
    console.log(this.HotelDetails);

    return foundHotel || "Hotel not found";
  }
  hotelDetails=this.searchHotelByName(this.HotelDetails);

  getStars(rating: number): number[] {
    const roundedRating = Math.round(rating);
    return Array.from({ length: roundedRating }, (_, index) => index);
  }

  scrollToRooms() {
    const roomsSection = document.querySelector('.rooms-list');
    if (roomsSection) {
      roomsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}


