import { Component, Output, EventEmitter,ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  constructor(private renderer: Renderer2){

  }
  
  @Output() searchEvent = new EventEmitter<{ location: string; checkIn: Date; checkOut: Date }>();

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
    this.searchEvent.emit({
      location: this.location,
      checkIn: this.checkInDate,
      checkOut: this.checkOutDate
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

  @ViewChild('guestsButton') guestsButton!: ElementRef;

  toggleGuestsPopup() {
    this.showGuestsPopup = !this.showGuestsPopup;
    if (this.showGuestsPopup) {
      this.calculatePopupPosition();
    }
  }


  increment(item: any) {
    item.count++;
    if (item.label === 'Rooms') {
      this.guestsItems[0].count = item.count;
      this.guestsItems[1].count = item.count;
    }
  }

  decrement(item: any) {
    if (item.count > 1) {
      item.count--;
      if (item.label === 'Rooms') {
        this.guestsItems[0].count = item.count;
        this.guestsItems[1].count = item.count;
      }
    }
  }
  
  generateGuestsAndRoomsValue() {
    return this.guestsItems
      .map(item => `${item.count} ${item.label}${item.count !== 1 ? 's' : ''}`)
      .join(', ');
  }

  applyGuests() {
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

}
