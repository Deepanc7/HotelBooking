import { Component } from '@angular/core';
import { BookingsService } from '../bookings.service';
import { Booking } from '../booking.interface';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss'],
  providers: [BookingsService]
})
export class BookingDetailsComponent {
  bookingDetailsList: Booking[] = [];

  constructor(private bookingsService: BookingsService) {
  }

  ngOnInit(): void {
    let email: string = sessionStorage.getItem("email") || "";
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
        let email: string = sessionStorage.getItem("email") || "";
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
