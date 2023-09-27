import { Component } from '@angular/core';
import { BookingsService } from '../bookings.service';
import { Booking } from '../booking.interface';
import { LoginServiceService } from '../login-page/login-service.service';
import { DatePipe } from '@angular/common';
import { User } from '../user.interface';
import { Hotel } from '../hotel.model';
import { DataService } from '../data.service';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss'],
  providers: [BookingsService, LoginServiceService, DataService, DatePipe]
})
export class BookingDetailsComponent {
  bookingDetailsList: Booking[] = [];
  checkins: string[] = [];
  checkouts: string[] = [];
  HotelNames: string[] = [];
  HotelImages: string[] = [];
  HotelAddresses: any[] = [];
  router: any;

  constructor(private bookingsService: BookingsService, private userService: LoginServiceService, private dataService: DataService, private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe(
      (user: User) => {
        this.bookingsService.getBookingsByEmail(user.id).subscribe(
          (bookings) => {
            this.bookingDetailsList = bookings;
            for (let i = 0; i < this.bookingDetailsList.length; i++) {
              this.checkins.push(this.datePipe.transform(this.bookingDetailsList[i].checkIn, 'dd-MM-yyyy') || '');
              this.checkouts.push(this.datePipe.transform(this.bookingDetailsList[i].checkOut, 'dd-MM-yyyy') || '');
            }
            for(let booking of this.bookingDetailsList) {
              this.dataService.getHotelById(booking.hotelId).subscribe((data: any) => {
                this.HotelNames.push(data.hotelName);
                this.HotelImages.push(data.hotelImage);
                this.HotelAddresses.push(data.address);
              });
            }
          }
        );
      },
      error => {
        console.error('Error fetching email:', error);
      });

    }
  

  delete(bookingId: string | undefined): void {
    this.bookingsService.deleteBooking(bookingId).subscribe(
      () => {
        this.userService.getUser().subscribe(
          (user: User) => {
            this.bookingsService.getBookingsByEmail(user.id).subscribe(
              (bookings) => {
                this.bookingDetailsList = bookings;
                for (let i = 0; i < this.bookingDetailsList.length; i++) {
                  this.checkins.push(this.datePipe.transform(this.bookingDetailsList[i].checkIn, 'dd-MM-yyyy') || '');
                  this.checkouts.push(this.datePipe.transform(this.bookingDetailsList[i].checkOut, 'dd-MM-yyyy') || '');
                }
              }
            );
          },
          error => {
            console.error('Error fetching email:', error);
          });
      }
    );
  }
}
