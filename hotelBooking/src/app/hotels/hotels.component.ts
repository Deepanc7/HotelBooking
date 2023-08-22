import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss'],
})
export class HotelsComponent implements OnInit {

  HotelData = JSON.parse(localStorage.getItem('hotel_data') || '[]');
  HotelDetails = JSON.parse(localStorage.getItem('hotel_details') || "[]");
  index:number=0;

  LowestRoomPrice: number[]=[];
  PriceRange:string='';

  lowestRoomPrice() {
    for(const hotel of this.HotelData) {
    let lowestPrice = Number.MAX_SAFE_INTEGER;

    for (const room of hotel.Rooms) {
      if (room.BaseRate < lowestPrice) {
        lowestPrice = room.BaseRate;
      }
    }
    this.LowestRoomPrice.push(lowestPrice);
    }
  }

  constructor(private router: Router) {
  }

  ngOnInit() {
    this.lowestRoomPrice();
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

  applyFilters() {
    if (this.PriceRange==="Range1") {
      
    }
  }
}
