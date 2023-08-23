import { Component } from '@angular/core';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.scss']
})
export class HotelDetailsComponent {
  HotelData = JSON.parse(localStorage.getItem('hotel_data') || '[]');
  HotelDetails = JSON.parse(localStorage.getItem('hotel_details') || "[]");
  hotelDetails = this.HotelData[this.HotelDetails];

  getStars(rating: number): number[] {
    // Implement the logic to convert the rating into an array of stars
    const roundedRating = Math.round(rating);
    return Array.from({ length: roundedRating }, (_, index) => index);
  }

  scrollToRooms() {
    // Implement the logic to scroll to the rooms section
    const roomsSection = document.querySelector('.rooms-list');
    if (roomsSection) {
      roomsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}


