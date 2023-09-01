import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search-bar/search.service';
import { SearchDetails } from '../search-bar/search-details.interface';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditPopUpComponent } from '../edit-pop-up/edit-pop-up.component';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-book-now',
  templateUrl: './book-now.component.html',
  styleUrls: ['./book-now.component.scss'],
  providers: [SearchService, DataService, DatePipe]
})
export class BookNowComponent implements OnInit {
  HotelData: any;
  HotelDetails: string = '';
  RoomDetails: string = '';

  GuestCount: number = 0;
  RoomCount: number = 0;
  checkInDate: any;
  checkOutDate: any;

  hotelDetails: any;
  roomDetails: any;
  discount: number = 0;
  priceAfterDiscount: number = 0;
  tax: number = 0;
  totalPrice: number = 0;

  searchDetails: SearchDetails = {
    location: '',
    checkIn: new Date(),
    checkOut: new Date(),
    guestsAndRooms: ''
  };

  constructor(private searchService: SearchService, private toastr: ToastrService, private router: Router, private dialog: MatDialog, private route: ActivatedRoute, private dataService: DataService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.HotelData = this.dataService.getHotelData();
    this.route.queryParams.subscribe(params => {
      this.HotelDetails = JSON.parse(params['details']);
      this.RoomDetails = JSON.parse(params['room']);
    });
    this.hotelDetails = this.searchHotelByName(this.HotelDetails);
    this.roomDetails = this.searchRoom(this.RoomDetails);
    this.discount = Number((Math.round((this.roomDetails.BaseRate * 15) / 100)).toFixed(2));
    this.priceAfterDiscount = this.roomDetails.BaseRate - this.discount;
    this.tax = Number((Math.round((this.priceAfterDiscount * 10) / 100)).toFixed(2));
    this.totalPrice = this.priceAfterDiscount + this.tax;
    let search: SearchDetails = this.searchService.getSearchDetails();
    let x = search.guestsAndRooms.split(" ");
    this.GuestCount = Number(x[0]) + Number(x[2]);
    this.RoomCount = Number(x[4]);

    let newdate: Date = search.checkIn;
    this.checkInDate = this.datePipe.transform(newdate, 'dd-MM-yyyy');

    let newdate1: Date = search.checkOut;
    this.checkOutDate = this.datePipe.transform(newdate1, 'dd-MM-yyyy');
  }

  success() {
    this.toastr.success('Congratulations! Your adventure headquarters is confirmed.', 'Booked');
    this.router.navigateByUrl('/');
  }

  searchHotelByName(hotelName: string) {
    const foundHotel = this.HotelData.find((hotel: { HotelName: string; }) => String(hotel.HotelName) === hotelName);

    return foundHotel || "Hotel not found";
  }

  getStars(rating: number): number[] {
    const roundedRating = Math.round(rating);
    return Array.from({ length: roundedRating }, (_, index) => index);
  }

  searchRoom(roomType: string) {
    for (let room of this.hotelDetails.Rooms) {
      if (room.Type === roomType) {
        return room;
      }
    }
  }
  openEditPopup(): void {
    const dialogRef = this.dialog.open(EditPopUpComponent, {
      width: '300px',
      data: {
        checkInDate: this.checkInDate,
        checkOutDate: this.checkOutDate,
        RoomDetails: this.RoomDetails,
        GuestCount: this.GuestCount
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Update booking details with edited values
        this.checkInDate = result.checkInDate;
        this.checkOutDate = result.checkOutDate;
        this.RoomDetails = result.RoomDetails;
        this.GuestCount = result.GuestCount;
      }
    });
  }
}
