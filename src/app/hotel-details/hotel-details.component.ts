import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search-bar/search.service';
import { SearchDetails } from '../search-bar/search-details.interface';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { LoginServiceService } from '../login-page/login-service.service';


@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.scss'],
  providers: [SearchService, DataService, LoginServiceService]
})
export class HotelDetailsComponent implements OnInit {
  HotelData: any[]=[];
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

  constructor(private searchService: SearchService,private userService: LoginServiceService, private router: Router, private route: ActivatedRoute, private dataService: DataService) { }


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.HotelDetails = JSON.parse(params['details']);
    });
    console.log(this.HotelDetails)
    this.dataService.getHotelData().subscribe((data: any) => {
      this.HotelData=data;
      this.hotelDetails = this.searchHotelByName(this.HotelDetails);
      });
    let search: SearchDetails = this.searchService.getSearchDetails();
    let x = search.guestsAndRooms.split(" ");
    this.GuestCount = Number(x[0]) + Number(x[2]);
    this.RoomCount = Number(x[4]);
  }

  searchHotelByName(Name: string) {
    const foundHotel = this.HotelData.find((hotel: any) => String(hotel.hotelName) === Name);
    return foundHotel;
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
    console.log("after")
    if (this.userService.isAuthenticated()){
    const navigationExtras = {
      queryParams: {
        details: this.HotelDetails,
        room: String(room.description)
      }
    };
    this.router.navigate(['/booking'], navigationExtras);
  }

else {
  this.router.navigate(['/login']);
}
  }
}