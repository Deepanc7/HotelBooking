import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search-bar/search.service';
import { SearchDetails } from '../search-bar/search-details.interface';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-now',
  templateUrl: './book-now.component.html',
  styleUrls: ['./book-now.component.scss'],
  providers: [SearchService]
})
export class BookNowComponent implements OnInit {
  HotelData = JSON.parse(localStorage.getItem('hotel_data') || '[]');
  HotelDetails = JSON.parse(localStorage.getItem('hotel_details') || "");
  RoomDetails = JSON.parse(localStorage.getItem('room-details') || "");

  GuestCount: number = 0;
  RoomCount: number = 0;
  checkInDate: string = "";
  checkOutDate: string = "";

  hotelDetails = this.searchHotelByName(this.HotelDetails);
  roomDetails = this.searchRoom(this.RoomDetails);
  discount: number = Number((Math.round((this.roomDetails.BaseRate * 15) / 100)).toFixed(2));
  priceAfterDiscount = this.roomDetails.BaseRate - this.discount;
  tax: number = Number((Math.round((this.priceAfterDiscount * 10) / 100)).toFixed(2));
  totalPrice = this.priceAfterDiscount + this.tax;

  searchDetails: SearchDetails = {
    location: '',
    checkIn: new Date(),
    checkOut: new Date(),
    guestsAndRooms: ''
  };

  constructor(private searchService: SearchService, private toastr: ToastrService,private router: Router) { }

  ngOnInit() {
    let search: SearchDetails = this.searchService.getSearchDetails();
    let x = search.guestsAndRooms.split(" ");
    this.GuestCount = Number(x[0]) + Number(x[2]);
    this.RoomCount = Number(x[4]);

    let splityear = String(search.checkIn).split("-");
    let splitdate = splityear[2].split("T");
    console.log(splitdate[0]);
    this.checkInDate = String(splitdate[0]) + "-" + String(splityear[1]) + "-" + String(splityear[0]);

    splityear = String(search.checkIn).split("-");
    splitdate = splityear[2].split("T");
    console.log(splitdate[0]);
    this.checkOutDate = String(splitdate[0]) + "-" + String(splityear[1]) + "-" + String(splityear[0]);
  }

  success() {
    this.toastr.success('Congratulations! Your adventure headquarters is confirmed.', 'Booked');
    this.router.navigateByUrl('/');
  }

  searchHotelByName(hotelName: string) {
    const foundHotel = this.HotelData.find((hotel: { HotelName: string; }) => String(hotel.HotelName) === hotelName);
    console.log(this.HotelDetails);

    return foundHotel || "Hotel not found";
  }

  getStars(rating: number): number[] {
    const roundedRating = Math.round(rating);
    return Array.from({ length: roundedRating }, (_, index) => index);
  }

  searchRoom(roomType: string) {
    for (let room of this.hotelDetails.Rooms) {
      if (room.Type === roomType) {
        return room;
      }
    }
  }
}
