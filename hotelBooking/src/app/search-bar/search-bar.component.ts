import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { SearchService } from './search.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {


  @ViewChild('guestsButton') guestsButton!: ElementRef;

  constructor(private renderer: Renderer2, private searchService: SearchService) {

  }

  location: string = '';
  checkInDate: Date = new Date();
  checkOutDate: Date = new Date();
  showGuestsPopup = false;

  searchSectionItems = [
    { icon: 'location_on', label: 'WHERE', input: 'text' },
    { icon: 'calendar_today', label: 'CHECKIN', input: 'Date' },
    { icon: 'calendar_today', label: 'CHECKOUT', input: 'Date' },
  ];

  searchHotels() {
    // Save search details
    this.searchService.setSearchDetails({
      location: this.location,
      checkIn: this.checkInDate,
      checkOut: this.checkOutDate,
      guestsAndRooms: this.guestsAndRoomsValue
    });
  }


  guestsItems = [
    { label: 'Adults', count: 1 },
    { label: 'Children', count: 0 },
    { label: 'Rooms', count: 1 }
  ];

  guestsAndRoomsValue = this.generateGuestsAndRoomsValue();
  popupTop = 0;
  popupLeft = 0;


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

  // function for check constraints on search button
  isSearchButtonDisabled() {
    return !this.location || !this.checkInDate || !this.checkOutDate || !this.guestsAndRoomsValue;
  }

}
