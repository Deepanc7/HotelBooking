import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { SearchService } from './search.service';
import { SearchDetails } from './search-details.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  @ViewChild('guestsButton') guestsButton!: ElementRef;
  location: string = '';
  checkInDate: Date = new Date();
  checkOutDate: Date = new Date();
  guestsAndRoomsValue: string = '';
  showGuestsPopup = false;
  guestAndRooms: string = "";


  guestsItems = [
    { label: 'Adults', count: 1 },
    { label: 'Children', count: 0 },
    { label: 'Rooms', count: 1 }
  ];

  popupTop = 0;
  popupLeft = 0;

  searchSectionItems = [
    { icon: 'location_on', label: 'WHERE', input: 'text' },
    { icon: 'calendar_today', label: 'CHECKIN', input: 'Date' },
    { icon: 'calendar_today', label: 'CHECKOUT', input: 'Date' },
  ];


  constructor(private router: Router, private renderer: Renderer2, private searchService: SearchService) {

  }



  searchHotels() {
    const details: SearchDetails = {
      location: this.location,
      checkIn: this.checkInDate,
      checkOut: this.checkOutDate,
      guestsAndRooms: this.guestsAndRoomsValue
    };
    this.searchService.setSearchDetails(details);
    this.router.navigateByUrl('/hotels');

  }

  toggleGuestsPopup() {
    this.showGuestsPopup = !this.showGuestsPopup;
    if (this.showGuestsPopup) {
      this.calculatePopupPosition();
    }
  }


  increment(item: any) {
    if (item.label !== 'Rooms') {
      item.count++;
      const totalGuests = this.guestsItems.reduce((total, guestItem) => guestItem.label !== 'Rooms' ? total + guestItem.count : total, 0);
      const roomsRequired = Math.ceil(totalGuests / 4);
      this.guestsItems[2].count = roomsRequired;
    }
  }

  decrement(item: any) {
    if (item.label !== 'Rooms' && item.count > 1) {
      item.count--;
      const totalGuests = this.guestsItems.reduce((total, guestItem) => guestItem.label !== 'Rooms' ? total + guestItem.count : total, 0);
      const roomsRequired = Math.ceil(totalGuests / 4);

      this.guestsItems[2].count = roomsRequired;
    }
  }

  generateGuestsAndRoomsValue() {
    return this.guestsItems
      .map(item => `${item.count} ${item.label}${item.count !== 1 ? 's' : ''}`)
      .join(', ');
  }

  applyGuests() {
    const totalGuests = this.guestsItems.reduce((total, guestItem) => guestItem.label !== 'Rooms' ? total + guestItem.count : total, 0);
    const roomsRequired = Math.ceil(totalGuests / 4);
    this.guestsItems[2].count = roomsRequired;

    if (this.checkOutDate < this.checkInDate) {
      this.checkOutDate = this.checkInDate;
    }

    this.guestsAndRoomsValue = this.generateGuestsAndRoomsValue();
    this.toggleGuestsPopup();
  }

  calculatePopupPosition() {
    if (this.guestsButton) {
      const buttonRect = this.guestsButton.nativeElement.getBoundingClientRect();
      this.popupTop = buttonRect.bottom + window.scrollY;
      this.popupLeft = buttonRect.left + window.scrollX;
    }
  }

  isSearchButtonDisabled() {
    return !this.location || !this.checkInDate || !this.checkOutDate || !this.guestsAndRoomsValue;
  }

}
