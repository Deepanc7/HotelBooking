import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { SearchService } from './search.service';
import { SearchDetails } from './search-details.interface';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  providers: [SearchService]
})

export class SearchBarComponent {

  @ViewChild('guestsButton') guestsButton!: ElementRef;
   location: string = '';
   checkInDate: Date = new Date();
   checkOutDate: Date = new Date();
   guestsAndRoomsValue: string = '';
  @Output() searchTriggered: EventEmitter<SearchDetails> = new EventEmitter<SearchDetails>();

  showGuestsPopup = false;
  guestAndRooms: string = "";
  HotelData = JSON.parse(localStorage.getItem('hotel_data') || '[]');

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

  constructor(private router: Router, private renderer: Renderer2, private searchService: SearchService, private toastr: ToastrService) {
  }

  searchHotels() {
    const details: SearchDetails = {
      location: this.location,
      checkIn: this.checkInDate,
      checkOut: this.checkOutDate,
      guestsAndRooms: this.guestsAndRoomsValue
    };
    if (this.searchHotelByLocation(this.location)) {
      this.searchService.setSearchDetails(details);
    this.router.navigateByUrl('/hotels');
    this.searchTriggered.emit(details);
    }
    else {
      this.toastr.error('Location does not exist', 'Error');
    }

  }

  searchHotelByLocation(location: string) {
    for (let hotel of this.HotelData){
      let loc = location.toLocaleLowerCase();
      let country = hotel.Address.Country.toLowerCase();
      let street = hotel.Address.StreetAddress.toLowerCase();
      let city = hotel.Address.City.toLowerCase();
      let state = hotel.Address.StateProvince;
      let postalcode = hotel.Address.PostalCode;
      let name = hotel.HotelName;
      if (country === loc || city == loc || street === loc || state === loc || postalcode === loc || name === loc) {
        return true;
      }
    }
    return false;
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
      const offset = 1;
      this.popupTop = buttonRect.bottom + window.scrollY + offset;
      this.popupLeft = buttonRect.left + window.scrollX;
    }
  }
  isSearchButtonDisabled() {
    return !this.location || !this.checkInDate || !this.checkOutDate || !this.guestsAndRoomsValue;
  }
}











