import { Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild, OnInit } from '@angular/core';
import { SearchService } from './search.service';
import { SearchDetails } from './search-details.interface';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../data.service';
import { count } from 'rxjs';
import { Hotel } from '../hotel.model';

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
  query: string = '';
  hotels: Hotel[] = [];


  showGuestsPopup = false;
  guestAndRooms: string = "";
  HotelData: any;

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
    this.sharedData = this.searchService.getSearchDetails();
    this.location = this.sharedData.location;
    this.checkInDate = new Date(this.sharedData.checkIn);
    this.checkOutDate = new Date(this.sharedData.checkOut);
    this.guestsAndRoomsValue= this.sharedData.guestAndRooms;
  }

  searchHotels() {
    if (this.location) {
      const searchDetails: SearchDetails = {
        location: this.location,
        checkIn: this.checkInDate,
        checkOut: this.checkOutDate,
        guestsAndRooms: this.guestsAndRoomsValue
      };
  
      this.searchService.setSearchDetails(searchDetails);
  
      this.searchService.searchHotels(this.location).subscribe(
        (response) => {
          if (response.length > 0) {
            this.hotels = response;
            this.router.navigateByUrl('/hotels');
            this.searchTriggered.emit(searchDetails);
          } else {
            this.toastr.warning('Location doesn\'t exist.', 'No Results Found');
          }
        },
        (error) => {
          console.error('Error while searching for hotels:', error);
        }
      );
    } else {
      console.error('Location is required for the search.');
    }
  }


  filterPastDates = (d: Date | null): boolean => {
    if (!d) {
      return false;
    }
    const currentDate = new Date();
    return d >= currentDate;
  };

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
    if ((item.label === 'Adults' && item.count > 1) || (item.label === 'Children' && item.count >= 1)) {
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