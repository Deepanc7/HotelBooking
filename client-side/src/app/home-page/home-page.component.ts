import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../search-bar/search.service';
import { SearchDetails } from '../search-bar/search-details.interface';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  providers: [SearchService, DataService]
})
export class HomePageComponent implements OnInit {
  HotelData: any[] = [];
  popularHotels: any[] = [];
  checkInDate: Date = new Date();
  checkOutDate: Date = new Date();
  guestsAndRoomsValue: string = '1 Adults, 0 Childrens, 1 Rooms';

  imageUrls: string[] = [
    "https://th.bing.com/th/id/OIP.c0c9mDgaPoJzSwZXlmOhJwHaEo?w=315&h=197&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    "https://th.bing.com/th/id/OIP.-a3357eTl7rWATZary_rWAHaE5?w=219&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    "https://th.bing.com/th/id/OIP.nvlz1kigUbNjsh7lNUs6xwHaE7?pid=ImgDet&rs=1",
    "https://th.bing.com/th/id/OIP.37sLYy1TbGBPi-pXmvKmBgHaEK?pid=ImgDet&rs=1",
    "https://th.bing.com/th/id/OIP.T0epVTOKR56nL9dg-0GzRgHaE7?w=217&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    "https://th.bing.com/th/id/OIP.WI3UM7DTL1YjXYG6F_ChHAHaE8?pid=ImgDet&rs=1",
    "https://th.bing.com/th/id/OIP.AdN94ZO2Kj-F21D0epgudAHaE8?pid=ImgDet&rs=1",
    "https://th.bing.com/th/id/OIP.xXVMudZvjhM3uwXUdCxgXgHaE8?pid=ImgDet&rs=1",
    "https://th.bing.com/th/id/OIP.SvHZ9DpWpFmHtT8i3aIePgHaE7?pid=ImgDet&rs=1",
    "https://th.bing.com/th/id/OIP.79_nFK2iuT5gMAraz0rBxgHaFj?pid=ImgDet&rs=1",
    "https://th.bing.com/th/id/OIP.UnwY9GUGrATHzyvcSgc8fQHaFj?pid=ImgDet&rs=1",
    "https://th.bing.com/th/id/OIP.A91QXUu8Q8EChUbaXfUa5AHaJb?pid=ImgDet&rs=1",
    "https://th.bing.com/th/id/OIP.v_MuDE6WPlSc1TLI6lcsHwHaE7?pid=ImgDet&rs=1",
    "https://th.bing.com/th/id/OIP.Wli-o_WP8tqJvP7pNcqKlQHaDF?w=299&h=145&c=7&r=0&o=5&dpr=1.3&pid=1.7",
    "https://th.bing.com/th/id/OIP.GJJnw5cRxg-cVGjBi-vHPAHaLH?pid=ImgDet&rs=1",
  ];

  place: string[] = [
    "Mountain View",
    "Atlanta",
    "Chicago",
    "Bangalore",
    "San Antonio",
    "New York",
    "Washington D.C.",
    "Detroit",
    "Seattle",
    "Austin",
    "Mysore",
    "Bellevue",
    "Redmond",
    "Metairie",
    "San Francisco",
  ]

  currentIndex = 0;
  maxIndex: number = 0;
  displayedHotels: any[] = [];
  startIndex = 0;
  itemsPerPage = 4;
  details: string = '';

  constructor(private router: Router, private searchService: SearchService, private dataService: DataService) {
  }

  ngOnInit() {
    const details: SearchDetails = {
      location: '',
      checkIn: new Date(),
      checkOut: new Date(),
      guestsAndRooms: ''
    };
    this.searchService.setSearchDetails(details);
    this.dataService.getHotelData().subscribe((data: any[]) => {
      this.HotelData = data;
      this.popularHotels = this.HotelData;
      this.HotelData.sort((a: any, b: any) => b.rating - a.rating);
      this.maxIndex = this.popularHotels.length - 1;
      this.updateDisplayedHotels();
    });

  }

  goToHotels(index: any) {
    const details: SearchDetails = {
      location: String(this.place[index]),
      checkIn: this.checkInDate,
      checkOut: this.checkOutDate,
      guestsAndRooms: this.guestsAndRoomsValue
    };
    this.searchService.setSearchDetails(details);
    this.router.navigateByUrl('/hotels');
  }

  getStars(rating: number): number[] {
    const roundedRating = Math.round(rating);
    return Array.from({ length: roundedRating }, (_, i) => i);
  }

  moveCarousel(direction: number): void {
    if (direction === -1 && this.startIndex > 0) {
      this.startIndex -= this.itemsPerPage;
    } else if (direction === 1 && this.startIndex + this.itemsPerPage < this.popularHotels.length) {
      this.startIndex += this.itemsPerPage;
    }
    this.updateDisplayedHotels();
  }

  updateDisplayedHotels(): void {
    this.displayedHotels = this.popularHotels.slice(this.startIndex, this.startIndex + this.itemsPerPage);
  }

  sendDataToHotelDetails(index: number) {
    const details: SearchDetails = {
      location: String(this.place[index]),
      checkIn: this.checkInDate,
      checkOut: this.checkOutDate,
      guestsAndRooms: this.guestsAndRoomsValue
    };
    this.searchService.setSearchDetails(details);
    for (let i = 0; i < this.HotelData.length; i++) {
      if (this.HotelData[i] === this.displayedHotels[index]) {
        this.details = String(this.HotelData[i].hotelName);
      }
    }
    const navigationExtras = {
      queryParams: {
        details: JSON.stringify(this.details)
      }
    };
    this.router.navigate(['/hotel-details'], navigationExtras);
  }
}
