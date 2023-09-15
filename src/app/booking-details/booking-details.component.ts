import { Component } from '@angular/core';
import { BookingsService } from '../bookings.service';
import { Booking } from '../booking.interface';
import { LoginServiceService } from '../login-page/login-service.service';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss'],
  providers: [BookingsService, LoginServiceService]
})
export class BookingDetailsComponent {
  bookingDetailsList: Booking[] = [];

  constructor(private bookingsService: BookingsService, private userService: LoginServiceService) {
  }

  ngOnInit(): void {
    let email=this.userService.getEmailToken();
    this.bookingsService.getBookingsByEmail(email).subscribe(
      (bookings) => {
        console.log('Bookings retrieved successfully:', bookings);
        this.bookingDetailsList = bookings;
        console.log(this.bookingDetailsList);
      }
    );
  }

  delete(bookingId: string|undefined): void {
    this.bookingsService.deleteBooking(bookingId).subscribe(
      () => {
        console.log('Booking deleted successfully');
        let email=this.userService.getEmailToken();
    this.bookingsService.getBookingsByEmail(email).subscribe(
      (bookings) => {
        console.log('Bookings retrieved successfully:', bookings);
        this.bookingDetailsList = bookings;
        console.log(this.bookingDetailsList);
      }
    );
      }
    );
  }
}
