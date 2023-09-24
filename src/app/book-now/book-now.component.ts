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
import { BookingsService } from '../bookings.service';
import { Booking } from '../booking.interface';
import { LoginServiceService } from '../login-page/login-service.service';
import { Hotel } from '../hotel.model';
import { User } from '../user.interface';

@Component({
  selector: 'app-book-now',
  templateUrl: './book-now.component.html',
  styleUrls: ['./book-now.component.scss'],
  providers: [SearchService, DataService, DatePipe, BookingsService, LoginServiceService]
})
export class BookNowComponent implements OnInit {
  HotelData: Hotel[] = [];
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
  id?: string;

  searchDetails: SearchDetails = {
    location: '',
    checkIn: new Date(),
    checkOut: new Date(),
    guestsAndRooms: ''
  };

  constructor(private searchService: SearchService, private userService: LoginServiceService, private bookingsService: BookingsService, private toastr: ToastrService, private router: Router, private dialog: MatDialog, private route: ActivatedRoute, private dataService: DataService, private datePipe: DatePipe) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.HotelDetails = params['details'];
      this.RoomDetails = params['room'];
    });
    this.dataService.getHotelData().subscribe((data: any[]) => {
      this.HotelData = data;
      this.hotelDetails = this.searchHotelByName(this.HotelDetails);
      this.roomDetails = this.searchRoom(this.RoomDetails);
      this.discount = Number((Math.round(Number(this.roomDetails?.baseRate) * 15) / 100).toFixed(2));
      this.priceAfterDiscount = Number((Math.round(this.roomDetails?.baseRate) - this.discount).toFixed(2));
      this.tax = Number((Math.round((this.priceAfterDiscount * 10) / 100)).toFixed(2));
      this.totalPrice = Number(Math.round(this.priceAfterDiscount + this.tax).toFixed(2));
    });
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
    let email:string='';
    let search:any=this.searchService.getSearchDetails();
    this.userService.getUser().subscribe(
      (user: User) => {
        let details: Booking = {
          id: this.id,
          hotelId: this.hotelDetails.id,
          checkIn: search.checkIn,
          checkOut: search.checkOut,
          room: this.RoomCount,
          guests: this.GuestCount,
          totalPrice: this.totalPrice,
          userId: user.id,
        }
        this.bookingsService.addBookingDetails(details).subscribe(
          (response) => {
          },
          (error) => {
            console.error('Error creating booking:', error);
          }
        );
        this.router.navigateByUrl('/bookingDetails');
      },
      error => {
        console.error('Error fetching email:', error);
      });

  }

  searchHotelByName(Name: string) {
    const foundHotel = this.HotelData.find((hotel: { hotelName: string; }) => String(hotel.hotelName) === Name);

    return foundHotel;
  }

  getStars(rating: number): number[] {
    const roundedRating = Math.round(rating);
    return Array.from({ length: roundedRating }, (_, index) => index);
  }

  searchRoom(roomType: string) {
    for (let room of this.hotelDetails.rooms) {
      if (room.description === roomType) {
        return room;
      }
    }
  }
  openEditPopup(): void {
    const dialogRef = this.dialog.open(EditPopUpComponent, {
      width: '300px',
      data: {
        hotel: this.hotelDetails,
        checkInDate: this.checkInDate,
        checkOutDate: this.checkOutDate,
        RoomDetails: this.RoomDetails,
        GuestCount: this.GuestCount
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.checkInDate = this.datePipe.transform(result.checkInDate, 'dd-MM-yyyy');
        this.checkOutDate = this.datePipe.transform(result.checkOutDate, 'dd-MM-yyyy');;
        this.RoomDetails = result.RoomDetails;
        this.GuestCount = result.GuestCount;
      }
    });
  }
}
