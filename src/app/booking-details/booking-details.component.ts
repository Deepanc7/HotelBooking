import { Component } from '@angular/core';
import { BookingsService } from '../bookings.service';
import { Booking } from '../booking.interface';
import { LoginServiceService } from '../login-page/login-service.service';
import { DatePipe } from '@angular/common';
import { User } from '../user.interface';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss'],
  providers: [BookingsService, LoginServiceService, DatePipe]
})
export class BookingDetailsComponent {
  bookingDetailsList: Booking[] = [];
  checkins: string[] = [];
  checkouts: string[] = [];

  constructor(private bookingsService: BookingsService, private userService: LoginServiceService, private datePipe: DatePipe) {
  }

  ngOnInit(): void {
    this.userService.getUser().subscribe(
      (user: User) => {
        this.bookingsService.getBookingsByEmail(user.email).subscribe(
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

  delete(bookingId: string | undefined): void {
    this.bookingsService.deleteBooking(bookingId).subscribe(
      () => {
        this.userService.getUser().subscribe(
          (user: User) => {
            this.bookingsService.getBookingsByEmail(user.email).subscribe(
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
