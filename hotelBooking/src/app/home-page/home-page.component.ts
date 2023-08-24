import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  HotelData = JSON.parse(localStorage.getItem('hotel_data') || '[]');
  popularHotels = this.HotelData;

  currentIndex = 0;
  maxIndex: number;
  displayedHotels: any[] = [];
  startIndex = 0;
  itemsPerPage = 4;
  LowestRoomPrice: number[] = [];
  details:string='';

  constructor(private router: Router) {
    this.HotelData.sort((a:any, b:any) => b.Rating - a.Rating);
    this.maxIndex = this.popularHotels.length - 1;
  }

  ngOnInit() {
    this.lowestRoomPrice();
    this.updateDisplayedHotels();
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

  sendDataToHotelDetails(Object: any) {
    for (let i = 0; i < this.displayedHotels.length; i++) {
      if (this.displayedHotels[i] === Object) {
        this.details = String(this.HotelData[i].HotelName);
      }
    }
    localStorage.setItem('hotel_details', JSON.stringify(this.details));
    this.router.navigateByUrl('/hotel-details');
  }
}
