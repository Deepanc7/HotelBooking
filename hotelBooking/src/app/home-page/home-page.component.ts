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
  ];

  place:string[]=[
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
    "Mysore"
  ]


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
    
    for(let i=0;i<this.HotelData.length;i++){
    console.log(this.HotelData[i].Address.City);
    }
  }

  goToHotels(index:any) {
    localStorage.setItem('hotels', JSON.stringify(this.place[index]));
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
