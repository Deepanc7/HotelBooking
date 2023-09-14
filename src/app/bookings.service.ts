import { Injectable } from '@angular/core';
import { Booking } from './booking.interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  addBookingDetails(bookingDetails: Booking): Observable<Booking> {
    return this.http.post<Booking>(`${this.apiUrl}/api/bookings`, bookingDetails);
  }

  getBookingsByEmail(email: string): Observable<Booking[]> {
    const url = `${this.apiUrl}/getBookings/${email}`;
    return this.http.get<Booking[]>(url);
  }

   deleteBooking(bookingId: string|undefined): Observable<any> {
     const url = `${this.apiUrl}/delete/${bookingId}`;
     return this.http.delete(url);
   }
}
