import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild, OnInit } from '@angular/core';
import { SearchService } from './search.service';
import { SearchDetails } from './search-details.interface';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../data.service';
import { count } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
  providers: [SearchService, DataService]
})

export class SearchBarComponent implements OnInit {

  @ViewChild('guestsButton') guestsButton!: ElementRef;
  sharedData: any;
  location: string = '';
  checkInDate: Date = new Date();
  checkOutDate: Date = new Date();
  guestsAndRoomsValue: string = '';
  @Output() searchTriggered: EventEmitter<SearchDetails> = new EventEmitter<SearchDetails>();


  showGuestsPopup = false;
  guestAndRooms: string = "";
  HotelData: any[]=[];

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

  constructor(private router: Router, private renderer: Renderer2, private searchService: SearchService, private toastr: ToastrService, private dataService: DataService) {
  }

  ngOnInit() {
    this.sharedData=this.searchService.getSearchDetails();
    this.location=this.sharedData.location;
    this.checkInDate=new Date(this.sharedData.checkIn);
    this.checkOutDate=new Date(this.sharedData.checkOut);
    this.dataService.getHotelData().subscribe((data: any[]) => {
      this.HotelData=data;
      });
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

  filterPastDates = (d: Date | null): boolean => {
    if (!d) {
      return false;
    }
    const currentDate = new Date();
    return d >= currentDate;
  };

  searchHotelByLocation(location: string) {
    for (let hotel of this.HotelData) {
      let loc = location.toLowerCase().trim();
      let country = hotel.address.country.toLowerCase();
      let street = hotel.address.streetAddress.toLowerCase();
      let city = hotel.address.city.toLowerCase();
      let state = hotel.address.atateProvince;
      let postalcode = hotel.address.postalCode;
      let name = hotel.hotelName.toLowerCase();
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
    if (item.label === 'Adults' && item.count > 1) {
    if (item.label !== 'Rooms' && item.count > 1) {
      item.count--;
      const totalGuests = this.guestsItems.reduce((total, guestItem) => guestItem.label !== 'Rooms' ? total + guestItem.count : total, 0);
      const roomsRequired = Math.ceil(totalGuests / 4);
      this.guestsItems[2].count = roomsRequired;
    }
  }
  }

  generateGuestsAndRoomsValue() {
    return this.guestsItems
      .map(item => `${item.count} ${item.label}${item.count !== 1 ? '' : ''}`)
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
    return !this.location || !this.checkInDate || !this.checkOutDate || !this.guestsAndRoomsValue || this.guestsItems[2].count === 0;
  }
}
