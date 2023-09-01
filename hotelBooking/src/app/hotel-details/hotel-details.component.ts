import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search-bar/search.service';
import { SearchDetails } from '../search-bar/search-details.interface';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.scss'],
  providers: [SearchService, DataService]
})
export class HotelDetailsComponent implements OnInit {
  HotelData: any;
  HotelDetails: string = '';
  hotelDetails: any;

  GuestCount: number = 0;
  RoomCount: number = 0;
  checkInDate: string = "12PM";
  checkOutDate: string = "12PM";

  searchDetails: SearchDetails = {
    location: '',
    checkIn: new Date(),
    checkOut: new Date(),
    guestsAndRooms: ''
  };

  constructor(private searchService: SearchService, private router: Router, private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    this.HotelData = this.dataService.getHotelData();
    this.route.queryParams.subscribe(params => {
      this.HotelDetails = JSON.parse(params['details']);
    });
    this.hotelDetails = this.searchHotelByName(this.HotelDetails);
    let search: SearchDetails = this.searchService.getSearchDetails();
    let x = search.guestsAndRooms.split(" ");
    this.GuestCount = Number(x[0]) + Number(x[2]);
    this.RoomCount = Number(x[4]);
  }

  searchHotelByName(hotelName: string) {
    const foundHotel = this.HotelData.find((hotel: { HotelName: string; }) => String(hotel.HotelName) === hotelName);

    return foundHotel || "Hotel not found";
  }

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

  selectRoom(room: any) {
    const navigationExtras = {
      queryParams: {
        details: JSON.stringify(this.HotelDetails),
        room: JSON.stringify(String(room.Type))
      }
    };
    this.router.navigate(['/booking'], navigationExtras);
  }
}