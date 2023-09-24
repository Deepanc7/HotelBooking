import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search-bar/search.service';
import { SearchDetails } from '../search-bar/search-details.interface';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { DatePipe } from '@angular/common';
import { LoginServiceService } from '../login-page/login-service.service';
import { Hotel } from '../hotel.model';
import { weatherService } from '../weather-service.service';


@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.scss'],
  providers: [SearchService, DataService, LoginServiceService, DatePipe, weatherService]
})
export class HotelDetailsComponent implements OnInit {
  HotelData: Hotel[] = [];
  HotelDetails: string = '';
  hotelDetails: any;

  GuestCount: number = 0;
  RoomCount: number = 0;
  checkInDate: string = "12PM";
  checkOutDate: string = "12PM";
  weatherData:any;

  searchDetails: SearchDetails = {
    location: '',
    checkIn: new Date(),
    checkOut: new Date(),
    guestsAndRooms: ''
  };

  constructor(private searchService: SearchService, private userService: LoginServiceService, private weatherService: weatherService, private router: Router, private route: ActivatedRoute, private dataService: DataService, private datePipe: DatePipe) { }


  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.HotelDetails = JSON.parse(params['details']);
    });
    this.dataService.getHotelData().subscribe((data: any) => {
      this.HotelData = data;
      this.hotelDetails = this.searchHotelByName(this.HotelDetails);
      this.searchLocation(this.hotelDetails.address.city);
    });
    let search: SearchDetails = this.searchService.getSearchDetails();
    this.checkInDate = this.datePipe.transform(search.checkIn, 'dd-MM-yyyy') || '';
    this.checkOutDate = this.datePipe.transform(search.checkOut, 'dd-MM-yyyy') || '';
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

  searchLocation(location: string) {
    this.weatherService.getWeatherByCityName(location).subscribe(
      (data) => {
        this.weatherData = data;
      },
      (error) => {
        console.error('Error fetching weather data:', error);
      }
    );
  }

  getWeatherIconUrl(description: string): string {
    const iconMapping: { [key: string]: string } = {
      'light intensity drizzle': 'icon-drizzle.png',
      'clear sky': 'icon-clear.png',
      'few clouds': 'icon-cloudy.png',
    };
    const defaultIcon = 'icon-default.png'; 
    const iconUrl = iconMapping[description.toLowerCase()] || defaultIcon;
    return `assets/${iconUrl}`;
  }

  selectRoom(room: any) {
    if (this.userService.isAuthenticated()) {
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